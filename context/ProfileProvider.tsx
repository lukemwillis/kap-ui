import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Contract, utils } from "koilib";
import { useAccount } from "./AccountProvider";
import profileAbiJson from "../contract/abi/profile-abi.json";
import nftAbiJson from "../contract/abi/nft-abi.json";
import { Abi } from "koilib/lib/interface";
import { useBoolean, useToast } from "@chakra-ui/react";

const profileAbi: Abi = {
  koilib_types: profileAbiJson.types,
  ...profileAbiJson,
};

const nftAbi: Abi = {
  koilib_types: nftAbiJson.types,
  ...nftAbiJson,
};

export type LinkObject = {
  key: string;
  value: string;
};

export type ProfileObject = {
  avatar_contract_id: string;
  avatar_token_id: string;
  name: string;
  bio: string;
  theme: string;
  links: LinkObject[];
};

type ProfileContextType = {
  profile?: ProfileObject;
  avatarSrc?: string;
  updateProfile: (profile: ProfileObject) => Promise<boolean>;
  isUpdating: boolean;
};

export const ProfileContext = createContext<ProfileContextType>({
  updateProfile: async () => false,
  isUpdating: false,
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { provider, signer, address } = useAccount();
  const [isUpdating, setIsUpdating] = useBoolean(false);
  const [profile, setProfile] = useState<ProfileObject>();
  const [avatarSrc, setAvatarSrc] = useState<string>();
  const toast = useToast();

  const { fetchProfile, updateProfile } = useMemo(() => {
    const profileContract = new Contract({
      id: process.env.NEXT_PUBLIC_PROFILE_ADDR,
      abi: profileAbi,
      provider,
      signer,
    });

    const fetchProfile = async () => {
      const { result: profileResult } =
        await profileContract!.functions.get_profile<ProfileObject>({
          address,
        });
      setProfile(profileResult);

      if (profileResult?.avatar_contract_id && profileResult.avatar_token_id) {
        const nftContract = new Contract({
          id: profileResult.avatar_contract_id,
          abi: nftAbi,
          provider,
          signer,
        });

        const { result: nftResult } = await nftContract!.functions.uri({});

        if (nftResult?.value) {
          const buffer = utils.toUint8Array(profileResult.avatar_token_id);
          const tokenId = new TextDecoder().decode(buffer);
          const uri = normalizeIpfsUris(nftResult.value as string);
          const metadata = await fetch(`${uri}/${tokenId}`);
          const { image } = await metadata.json();
          const imageSrc = normalizeIpfsUris(image);
          setAvatarSrc(imageSrc);
        }
      }
    };

    return {
      fetchProfile,
      updateProfile: async (profile: ProfileObject) => {
        let result = false;
        try {
          setIsUpdating.on();
          const mana = await provider!.getAccountRc(address!);
          const { transaction } =
            await profileContract!.functions.update_profile(
              {
                address,
                profile,
              },
              {
                rcLimit: `${Math.min(parseInt(mana || "0"), 10_0000_0000)}`,
              }
            );
          toast({
            title: `Profile update transaction submitted`,
            description: `The transaction to update your profile is being processed, this may take some time.`,
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          await transaction!.wait();
          fetchProfile();
          toast({
            title: `Profile update transaction succeeded`,
            description: `The transaction to update your profile succeeded! Have a great day!`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          result = true;
        } catch (e) {
          toast({
            title: `Profile update transaction failed`,
            description: `The transaction to update your profile failed with error message: ${e}`,
            status: "error",
            duration: 10000,
            isClosable: true,
            position: "bottom-left",
          });
        } finally {
          setIsUpdating.off();
        }
        return result;
      },
    };
  }, [address, provider, setIsUpdating, signer, toast]);

  useEffect(() => {
    if (address) {
      fetchProfile();
    }
  }, [address]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        avatarSrc,
        updateProfile,
        isUpdating,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

function normalizeIpfsUris(uri: string) {
  let result = uri;
  if (uri.startsWith("ipfs://")) {
    const path = uri.indexOf("/", 7);
    if (path > -1) {
      result =
        "https://" +
        uri.substring(7, path) +
        ".ipfs.nftstorage.link" +
        uri.substring(path);
    } else {
      result = "https://" + uri.substring(7) + ".ipfs.nftstorage.link";
    }
  }
  return result;
}