import React, { useContext, createContext, useMemo } from "react";
import { Contract, utils } from "koilib";
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
  renew: (name: string, years: number) => Promise<boolean>;
  isRenewing: boolean;
  transfer: (name: string, to: string) => Promise<boolean>;
  isTransferring: boolean;
};

export const NameServiceContext = createContext<NameServiceContextType>({
  getName: async () => undefined,
  getNames: async () => undefined,
  mint: async () => false,
  isMinting: false,
  renew: async () => false,
  isRenewing: false,
  transfer: async () => false,
  isTransferring: false,
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
  const [isRenewing, setIsRenewing] = useBoolean(false);
  const [isTransferring, setIsTransferring] = useBoolean(false);
  const toast = useToast();

  const { getName, getNames, mint, renew, transfer } = useMemo(() => {
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
                  // TODO use domain
                  name: `${name}.koin`,
                  duration_increments: items[name].years,
                  owner: address,
                  payment_from: address,
                  payment_token_address: process.env.NEXT_PUBLIC_KOIN_ADDR,
                },
                {
                  onlyOperation: true,
                }
              );
              return operation;
            })
          );
          const mana = await provider!.getAccountRc(address!);
          const tx = await signer!.prepareTransaction({
            header: {
              rc_limit: `${Math.min(parseInt(mana || "0"), 10_0000_0000)}`,
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
      renew: async (name: string, years: number) => {
        let result = false;
        try {
          setIsRenewing.on();
          const mana = await provider!.getAccountRc(address!);
          const { transaction } = await nameService!.functions.renew(
            {
              name,
              duration_increments: years,
              payment_from: address,
              payment_token_address: process.env.NEXT_PUBLIC_KOIN_ADDR,
            },
            {
              rcLimit: `${Math.min(parseInt(mana || "0"), 10_0000_0000)}`,
            }
          );
          toast({
            title: `Name renewal transaction submitted`,
            description: `The transaction to renew your name is being processed, this may take some time.`,
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          await transaction!.wait();
          toast({
            title: `Name renewal transaction succeeded`,
            description: `The transaction to renew your name succeeded! Have a great day!`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          result = true;
        } catch (e) {
          toast({
            title: `Name renewal transaction failed`,
            description: `The transaction to renew your name failed with error message: ${e}`,
            status: "error",
            duration: 10000,
            isClosable: true,
            position: "bottom-left",
          });
        } finally {
          setIsRenewing.off();
        }
        return result;
      },
      transfer: async (name: string, to: string) => {
        let result = false;
        try {
          setIsTransferring.on();
          const mana = await provider!.getAccountRc(address!);
          const buffer = new TextEncoder().encode(name);
          const token_id = "0x" + utils.toHexString(buffer);
          const { transaction } = await nameService!.functions.transfer(
            {
              token_id,
              from: address,
              to,
            },
            {
              rcLimit: `${Math.min(parseInt(mana || "0"), 10_0000_0000)}`,
            }
          );
          toast({
            title: `Transfer transaction submitted`,
            description: `The transaction to transfer your name is being processed, this may take some time.`,
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          await transaction!.wait();
          toast({
            title: `Transfer transaction succeeded`,
            description: `The transaction to transfer your name succeeded! Have a great day!`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          result = true;
        } catch (e) {
          toast({
            title: `Transfer transaction failed`,
            description: `The transaction to transfer your name failed with error message: ${e}`,
            status: "error",
            duration: 10000,
            isClosable: true,
            position: "bottom-left",
          });
        } finally {
          setIsTransferring.off();
        }
        return result;
      },
    };
  }, [
    address,
    clearItems,
    items,
    provider,
    setIsMinting,
    setIsRenewing,
    setIsTransferring,
    signer,
    toast,
  ]);

  return (
    <NameServiceContext.Provider
      value={{
        getName,
        getNames,
        mint,
        isMinting,
        renew,
        isRenewing,
        transfer,
        isTransferring,
      }}
    >
      {children}
    </NameServiceContext.Provider>
  );
};
