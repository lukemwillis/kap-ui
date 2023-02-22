import React, { useContext, createContext, useMemo } from "react";
import { Contract } from "koilib";
import { useAccount } from "./AccountProvider";
import namerserviceAbi from "../contract/abi/nameservice-abi.json";
import { Abi } from "koilib/lib/interface";
import { useCart } from "./CartProvider";
import { useBoolean, useToast } from "@chakra-ui/react";

const abi: Abi = {
  koilib_types: namerserviceAbi.types,
  ...namerserviceAbi,
};

export type NameObject = {
  name: string;
  domain: string;
  owner: string;
  expiration: string;
  grace_period_end: string;
};

type NameServiceContextType = {
  getName: (name: string) => Promise<NameObject | undefined>;
  getNames: () => Promise<{ names: NameObject[] } | undefined>;
  mint: () => Promise<boolean>;
  isMinting: boolean;
};

export const NameServiceContext = createContext<NameServiceContextType>({
  getName: async () => undefined,
  getNames: async () => undefined,
  mint: async () => false,
  isMinting: false,
});

export const useNameService = () => useContext(NameServiceContext);

export const NameServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { address, provider, signer } = useAccount();
  const {
    state: { items },
    clearItems,
  } = useCart();
  const [isMinting, setIsMinting] = useBoolean(false);
  const toast = useToast();

  const { getName, getNames, mint } = useMemo(() => {
    const nameService = new Contract({
      id: process.env.NEXT_PUBLIC_NAME_SERVICE_ADDR,
      abi,
      provider,
      signer,
    });

    return {
      getName: async (name: string) => {
        const { result } = await nameService!.functions.get_name<NameObject>({
          name,
        });
        return result;
      },
      getNames: async () => {
        const { result } = await nameService!.functions.get_names<{
          names: NameObject[];
        }>({
          owner: address,
          nameOffset: "",
          descending: false,
          limit: 100,
        });
        return result;
      },
      mint: async () => {
        let result = false;
        try {
          setIsMinting.on();
          const operations = await Promise.all(
            Object.keys(items).map(async (name) => {
              const { operation } = await nameService!.functions.mint(
                {
                  name: `${name}.koin`,
                  duration_increments: items[name].years,
                  owner: address,
                  payment_from: address,
                  payment_token_address: process.env.PUBLIC_NEXT_KOIN_ADDR,
                },
                {
                  onlyOperation: true,
                }
              );
              return operation;
            })
          );
          const tx = await signer!.prepareTransaction({
            header: {
              // TODO improve rclimit
              rcLimit: "10000000000",
            },
            operations,
          });
          const { transaction } = await signer?.sendTransaction(tx)!;
          toast({
            title: `Mint transaction submitted`,
            description: `The transaction to mint your names is being processed, this may take some time.`,
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          await transaction.wait();
          toast({
            title: `Mint transaction succeeded`,
            description: `The transaction to mint your names succeeded! Have a great day!`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          result = true;
          clearItems();
        } catch (e) {
          toast({
            title: `Mint transaction failed`,
            description: `The transaction to mint your names failed with error message: ${e}`,
            status: "error",
            duration: 10000,
            isClosable: true,
            position: "bottom-left",
          });
        } finally {
          setIsMinting.off();
        }
        return result;
      },
    };
  }, [address, clearItems, items, provider, setIsMinting, signer, toast]);

  return (
    <NameServiceContext.Provider
      value={{
        getName,
        getNames,
        mint,
        isMinting,
      }}
    >
      {children}
    </NameServiceContext.Provider>
  );
};
