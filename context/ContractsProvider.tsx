import React, { useContext, createContext } from "react";
import { Contract, Provider, Signer } from "koilib";
import * as kondor from "../node_modules/kondor-js/lib/browser";
import { useAccount } from "./AccountProvider";
import { useRpc } from "./RpcProvider";

type ContractsContextType = {
  nft?: Contract;
};

export const ContractsContext = createContext<ContractsContextType>({});

export const useContracts = () => useContext(ContractsContext);

export const ContractsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { address } = useAccount();
  const { rpc } = useRpc();

  const provider = new Provider(rpc!);
  const signer = address ? kondor.getSigner(address) as Signer : undefined;

  return (
    <ContractsContext.Provider
      value={{
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};
