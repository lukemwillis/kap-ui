import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";
import * as kondor from "../node_modules/kondor-js/lib/browser";
import MyKoinosWallet from "@roamin/my-koinos-wallet-sdk";
import useLocalStorage from "./useLocalStorage";
import { Contract, Provider, Signer } from "koilib";
import { event } from "../utils/ga";
import { nftAbi } from "./ProfileProvider";

type AccountContextType = {
  address?: string;
  isConnecting: boolean;
  connectKondor: () => Promise<boolean>;
  connectMKW: () => Promise<boolean>;
  provider?: Provider;
  signer?: Signer;
  hasPressBadge: boolean;
};

export const AccountContext = createContext<AccountContextType>({
  isConnecting: false,
  connectKondor: async () => false,
  connectMKW: async () => false,
  hasPressBadge: false,
});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isConnecting, setIsConnecting] = useState(false);

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [walletUsed, setWalletUsed] = useState<string>("");
  const [provider, setProvider] = useState<Provider>(
    new Provider([process.env.NEXT_PUBLIC_KOINOS_RPC_URL!])
  );
  const [signer, setSigner] = useState<Signer | undefined>();
  const [hasPressBadge, setHasPressBadge] = useState(false);

  const mkwRef = useRef<MyKoinosWallet>();

  useEffect(() => {
    mkwRef.current = new MyKoinosWallet(
      "https://mykw.vercel.app/embed/wallet-connector"
    );

    return () => {
      mkwRef.current!.close();
    };
  }, []);

  useEffect(() => {
    if (walletUsed === "kondor") {
      setProvider(kondor.provider as unknown as Provider);
      if (address) {
        // TODO koilib bug
        const s = kondor.getSigner(address) as Signer;
        s.provider = kondor.provider as unknown as Provider;
        setSigner(s);
      }
    } else if (walletUsed === "mkw" && mkwRef.current) {
      mkwRef.current!.connect().then(async (isConnected) => {
        if (isConnected) {
          setProvider(mkwRef.current!.getProvider());
          if (address) {
            setSigner(mkwRef.current!.getSigner(address) as unknown as Signer);
          }
        }
      });
    }

    if (address) {
      const pressBadgeContract = new Contract({
        id: process.env.NEXT_PUBLIC_PRESS_BADGE_ADDR,
        abi: nftAbi,
        provider,
      });

      pressBadgeContract!.functions.balance_of({
        owner: address,
      }).then(({ result }) => {
        setHasPressBadge((result?.value as number) > 0);
      });
    }
  }, [address, walletUsed]);

  useLocalStorage("ACCOUNT", address, setAddress);
  useLocalStorage("WALLET", walletUsed, setWalletUsed);

  const connectKondor = async () => {
    if (isConnecting) return false;

    setIsConnecting(true);
    // @ts-ignore getAccounts returns objects, not strings
    const [{ address }] = await Promise.race([
      kondor.getAccounts(),
      new Promise<{ address: string }[]>((resolve) =>
        setTimeout(() => resolve([{ address: "" }]), 10000)
      ),
    ]);
    if (address) {
      setAddress(address);
      setWalletUsed("kondor");
      event("login", {
        method: "kondor",
      });
    }
    setIsConnecting(false);

    return !!address;
  };

  const connectMKW = async () => {
    if (!mkwRef.current || isConnecting) return false;

    let address;

    setIsConnecting(true);
    try {
      if (await mkwRef.current!.connect()) {
        await mkwRef.current.requestPermissions({
          accounts: ["getAccounts"],
          signer: ["prepareTransaction", "signAndSendTransaction"],
          provider: ["readContract", "wait", "getAccountRc"],
        });
        const accounts = await mkwRef.current.getAccounts();
        address = accounts[0].address;
        if (address) {
          setAddress(address);
          setWalletUsed("mkw");
          event("login", {
            method: "mkw",
          });
        }
      }
      setIsConnecting(false);
    } catch (e) {
      setIsConnecting(false);
      throw e;
    }
    return !!address;
  };

  return (
    <AccountContext.Provider
      value={{
        address,
        isConnecting,
        connectKondor,
        connectMKW,
        provider,
        signer,
        hasPressBadge
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
