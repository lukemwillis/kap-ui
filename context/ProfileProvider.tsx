import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Contract } from "koilib";
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
          const metadata = await fetch(
            `${nftResult.value}/${profileResult.avatar_token_id}`
          );
          const { image } = await metadata.json();
          setAvatarSrc(image);
        }
      }
    };

    return {
      fetchProfile,
      updateProfile: async (profile: ProfileObject) => {
        let result = false;
        try {
          setIsUpdating.on();
          const { transaction } =
            await profileContract!.functions.update_profile(
              {
                address,
                profile,
              },
              {
                // TODO improve rclimit
                rcLimit: "1000000000",
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
