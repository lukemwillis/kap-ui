import React, {
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";
import * as kondor from "../node_modules/kondor-js/lib/browser";
import useLocalStorage from "./useLocalStorage";
import { Contract, Provider, Signer } from "koilib";
import { event } from "../utils/ga";
import { nftAbi } from "./ProfileProvider";
import { WebWalletConnectKoinos, ChainIds, Methods } from "@armana/walletconnect-koinos-sdk-js";

type AccountContextType = {
  address?: string;
  isConnecting: boolean;
  connectKondor: () => Promise<boolean>;
  connectWalletConnect: () => Promise<boolean>;
  provider?: Provider;
  signer?: Signer;
  hasPressBadge: boolean;
};

export const AccountContext = createContext<AccountContextType>({
  isConnecting: false,
  connectKondor: async () => false,
  connectWalletConnect: async () => false,
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

  const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;
  const walletConnectKoinos = new WebWalletConnectKoinos(
    {
      projectId,
      metadata: {
        name: "KAP",
        description: "Koinos Account Protocol",
        url: "kap.domains",
        icons: [
          // TODO use logo
          "https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg",
        ],
      },
      modalOptions: {
        explorerRecommendedWalletIds: "NONE",
        enableExplorer: false,
      },
    }
  );

  useEffect(() => {
    if (walletUsed === "kondor") {
      setProvider(kondor.provider as unknown as Provider);
      if (address) {
        // TODO koilib bug
        const s = kondor.getSigner(address) as Signer;
        s.provider = kondor.provider as unknown as Provider;
        setSigner(s);
      }
    } else if (walletUsed === "walletconnect") {
      setProvider(walletConnectKoinos.getProvider(ChainIds.Harbinger) as Provider)
      if (address) {
        setSigner(walletConnectKoinos.getSigner(address, provider, ChainIds.Harbinger) as unknown as Signer);
      }
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

  const connectWalletConnect = async () => {
    if (isConnecting) return false;

    setIsConnecting(true);
    try {
      const [address] = await walletConnectKoinos.connect(
        [ChainIds.Harbinger],
        [
          Methods.ReadContract, 
          Methods.SignAndSendTransaction,
          Methods.PrepareTransaction,
          Methods.WaitForTransaction,
          Methods.GetAccountRc
        ]
      );

      if (address) {
        setAddress(address);
        setWalletUsed("walletconnect");
        event("login", {
          method: "walletconnect",
        });
      }

    } catch (e) {
      console.error(e);
    } finally {
      setIsConnecting(false);
    }

    return !!address;
  };

  return (
    <AccountContext.Provider
      value={{
        address,
        isConnecting,
        connectKondor,
        connectWalletConnect,
        provider,
        signer,
        hasPressBadge
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
