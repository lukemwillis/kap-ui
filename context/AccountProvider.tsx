import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";
import * as kondor from "../node_modules/kondor-js/lib/browser";
import MyKoinosWallet from "@roamin/my-koinos-wallet-sdk";

const LOCAL_STORAGE_KEY = "ACCOUNT";

type AccountContextType = {
  account?: string;
  isConnecting: boolean;
  connectKondor: () => Promise<boolean>;
  connectMKW: () => Promise<boolean>;
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

  const [account, setAccount] = useState<string | undefined>(undefined);
  const mkwRef = useRef<MyKoinosWallet>();

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setAccount(saved);
    }

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
    if (!account) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, account);
  }, [account]);

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
    if (address) setAccount(address);
    setIsConnecting(false);

    return !!address;
  };

  const connectMKW = async () => {
    if (!mkwRef.current || !isMKWSupported || isConnecting) return false;

    let address;

    setIsConnecting(true);
    try {
      console.log('begin')
      const permissions = await mkwRef.current.requestPermissions({
        accounts: ["getAccounts"],
        provider: ["readContract"],
      });
      console.log(permissions);
      const accounts = await mkwRef.current.getAccounts();
      console.log(accounts);
      address = accounts[0].address;
      console.log(address);
      if (address) setAccount(address);
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
        account,
        isConnecting,
        connectKondor,
        connectMKW,
        isMKWSupported,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
