import React, {
  SetStateAction,
  useContext,
  useState,
  createContext,
} from "react";
import useLocalStorage from "./useLocalStorage";

type RpcContextType = {
  rpc?: string;
  setRpc: React.Dispatch<SetStateAction<string>>;
};

export const RpcContext = createContext<RpcContextType>({
  rpc: "",
  setRpc: () => undefined,
});

export const useRpc = () => useContext(RpcContext);

export const RpcProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [rpc, setRpc] = useState(process.env.NEXT_PUBLIC_KOINOS_RPC_URL!.split(',')[0]);
  useLocalStorage("RPC", rpc, setRpc);

  return (
    <RpcContext.Provider value={{ rpc, setRpc }}>
      {children}
    </RpcContext.Provider>
  );
};
