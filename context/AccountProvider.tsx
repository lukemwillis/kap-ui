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
import { Provider, Signer } from "koilib";

type AccountContextType = {
  address?: string;
  isConnecting: boolean;
  connectKondor: () => Promise<boolean>;
  connectMKW: () => Promise<boolean>;
  provider?: Provider;
  signer?: Signer;
  isMKWSupported: boolean;
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
  const [provider, setProvider] = useState<Provider>(new Provider([process.env.NEXT_PUBLIC_KOINOS_RPC_URL!]));
  const [signer, setSigner] = useState<Signer | undefined>();

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
    // TODO kondor updated?
    // TODO MKW version
    setProvider(kondor.provider as unknown as Provider);
    if (address) {
      setSigner(kondor.getSigner(address) as Signer);
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
      await mkwRef.current.requestPermissions({
        accounts: ["getAccounts"],
        provider: ["readContract"],
      });
      const accounts = await mkwRef.current.getAccounts();
      address = accounts[0].address;
      if (address) {
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
        provider,
        signer,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
