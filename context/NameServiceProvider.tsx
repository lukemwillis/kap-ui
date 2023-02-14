import React, { useContext, createContext, useMemo } from "react";
import { Contract } from "koilib";
import { useAccount } from "./AccountProvider";
import namerserviceAbi from "../contract/abi/nameservice-abi.json";
import { Abi } from "koilib/lib/interface";

const abi: Abi = {
  koilib_types: namerserviceAbi.types,
  ...namerserviceAbi,
};

type NameObject = {
    name: string;
    domain: string;
    owner: string;
};

type NameServiceContextType = {
  getName: (name: string) => Promise<NameObject | undefined>;
  getNames: () => void;
  mint: () => void;
};

export const NameServiceContext = createContext<NameServiceContextType>({
  getName: async () => undefined,
  getNames: () => {},
  mint: () => {},
});

export const useNameService = () => useContext(NameServiceContext);

export const NameServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { address, provider, signer } = useAccount();

  const nameService = useMemo(
    () =>
      new Contract({
        id: process.env.NEXT_PUBLIC_NAME_SERVICE_ADDR,
        abi,
        provider,
        signer,
      }),
    [provider, signer]
  );

  return (
    <NameServiceContext.Provider
      value={{
        getName: async (name: string) => {
          const { result } = await nameService!.functions.get_name<NameObject>({
            name,
          });
          return result;
        },
        getNames: () => {},
        mint: () => {},
      }}
    >
      {children}
    </NameServiceContext.Provider>
  );
};
