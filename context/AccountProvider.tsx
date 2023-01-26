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

type AccountContextType = {
  address?: string;
  isConnecting: boolean;
  connectKondor: () => Promise<boolean>;
  connectMKW: () => Promise<boolean>;
  isMKWSupported: boolean;
  primaryUsername?: string;
  primaryAvatarSrc?: string;
};

export const AccountContext = createContext<AccountContextType>({
  isConnecting: false,
  connectKondor: async () => false,
  connectMKW: async () => false,
  isMKWSupported: true,
});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMKWSupported, setIsMKWSupported] = useState(true);

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [primaryUsername, setPrimaryUsername] = useState<string | undefined>(
    undefined
  );
  const [primaryAvatarSrc, setPrimaryAvatarSrc] = useState<string | undefined>(
    undefined
  );

  const mkwRef = useRef<MyKoinosWallet>();

  useEffect(() => {
    mkwRef.current = new MyKoinosWallet(
      "https://mykw.vercel.app/embed/wallet-connector"
    );

    const setup = async () => {
      const mkwSupport = await mkwRef.current!.connect();
      setIsMKWSupported(mkwSupport);
    };

    setup();

    return () => {
      mkwRef.current!.close();
    };
  }, []);

  useEffect(() => {
    if (address === "1Phen7sf6kjAgJ3jwiheWW6SFDumDoWgUf") {
      setPrimaryUsername("luke.koin");
      setPrimaryAvatarSrc(
        "https://bafybeial7korh5zldyo7qmz4kkeeo5tt7tybhd7jiorz2nx7iwvpzeadhi.ipfs.nftstorage.link/assets/01.png"
      );
    }
  }, [address]);

  useLocalStorage("ACCOUNT", address, setAddress);

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
      setPrimaryUsername("");
      setPrimaryAvatarSrc("");
      setAddress(address);
    }
    setIsConnecting(false);

    return !!address;
  };

  const connectMKW = async () => {
    if (!mkwRef.current || !isMKWSupported || isConnecting) return false;

    let address;

    setIsConnecting(true);
    try {
      console.log("begin");
      const permissions = await mkwRef.current.requestPermissions({
        accounts: ["getAccounts"],
        provider: ["readContract"],
      });
      console.log(permissions);
      const accounts = await mkwRef.current.getAccounts();
      console.log(accounts);
      address = accounts[0].address;
      console.log(address);
      if (address) {
        setPrimaryUsername("");
        setPrimaryAvatarSrc("");
        setAddress(address);
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
        connectMKW,
        isMKWSupported,
        primaryUsername,
        primaryAvatarSrc,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
