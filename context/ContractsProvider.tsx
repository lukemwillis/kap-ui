import React, { useContext, createContext } from "react";
import { Contract, Provider, Signer } from "koilib";
import { useAccount } from "./AccountProvider";

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

  return (
    <ContractsContext.Provider
      value={{
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};
