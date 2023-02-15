import React, { useContext, createContext, useMemo } from "react";
import { Contract } from "koilib";
import { useAccount } from "./AccountProvider";
import usdoracleAbi from "../contract/abi/usdoracle-abi.json";
import { Abi } from "koilib/lib/interface";
import { useBoolean } from "@chakra-ui/react";

const abi: Abi = {
  koilib_types: usdoracleAbi.types,
  ...usdoracleAbi,
};

type UsdOracleContextType = {
  getLatestKoinPrice: () => Promise<{ price: string } | undefined>;
  isLoading: boolean;
};

export const UsdOracleContext = createContext<UsdOracleContextType>({
  getLatestKoinPrice: async () => undefined,
  isLoading: false,
});

export const useUsdOracle = () => useContext(UsdOracleContext);

export const UsdOracleProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { provider } = useAccount();
  const [isLoading, setIsLoading] = useBoolean(false);

  const usdOracle = useMemo(
    () =>
      new Contract({
        id: process.env.NEXT_PUBLIC_USD_ORACLE_ADDR,
        abi,
        provider,
      }),
    [provider]
  );

  return (
    <UsdOracleContext.Provider
      value={{
        getLatestKoinPrice: async () => {
          setIsLoading.on();
          const { result } = await usdOracle!.functions.get_latest_price<{ price: string }>({
            token_address: process.env.NEXT_PUBLIC_KOIN_ADDR,
          });
          setIsLoading.off();
          return result;
        },
        isLoading
      }}
    >
      {children}
    </UsdOracleContext.Provider>
  );
};
