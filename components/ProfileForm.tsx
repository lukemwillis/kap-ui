import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Spinner,
  Stack,
  Text,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import Avatar from "../components/Avatar";
import Textarea from "../components/Textarea";
import SocialLinks from "../components/SocialLinks";
import { useEffect, useMemo, useState } from "react";
import { FaCamera, FaPencilAlt, FaShare, FaShareAlt } from "react-icons/fa";
import ColorPicker from "./ColorPicker";
import { NameObject } from "../context/NameServiceProvider";
import {
  nftAbi,
  normalizeIpfsUris,
  ProfileObject,
  useProfile,
} from "../context/ProfileProvider";
import { Contract, utils } from "koilib";
import { useAccount } from "../context/AccountProvider";
import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  StarIcon,
} from "@chakra-ui/icons";

interface ProfileFormProps {
  names: NameObject[];
}

export default function ProfileForm({ names }: ProfileFormProps) {
  const { address, provider } = useAccount();
  const { profile, updateProfile, isUpdating } = useProfile();
  const [localProfile, setLocalProfile] = useState(profile);
  const [isThemeLight, setIsThemeLight] = useState(true);
  const popoverColor = useColorModeValue("gray.800", "white");
  const theme = localProfile?.theme || "fff";
  const tokenId = useMemo(() => {
    if (
      localProfile?.avatar_token_id &&
      localProfile.avatar_token_id !== "0x"
    ) {
      const buffer = utils.toUint8Array(
        localProfile.avatar_token_id.substring(2)
      );
      return new TextDecoder().decode(buffer);
    }
    return "";
  }, [localProfile?.avatar_token_id]);
  const [localAvatarSrc, setLocalAvatarSrc] = useState("");
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const [avatarContractError, setAvatarContractError] = useState("");
  const [avatarTokenError, setAvatarTokenError] = useState("");
  const [bioHasError, setBioHasError] = useState(false);
  const [themeHasError, setThemeHasError] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { onCopy, setValue } = useClipboard(
    `https://kap.plus/${profile?.name}`
  );

  useEffect(() => {
    const fetchAvatarSrc = async () => {
      if (localProfile?.avatar_contract_id && localProfile.avatar_token_id) {
        setIsAvatarLoading(true);
        const nftContract = new Contract({
          id: localProfile.avatar_contract_id,
          abi: nftAbi,
          provider,
        });

        try {
          const { result: ownerResult } = await nftContract!.functions.owner_of(
            { token_id: localProfile.avatar_token_id }
          );

          setAvatarContractError("");

          if (ownerResult?.value !== address) {
            setAvatarTokenError("You don't own that NFT");
            return;
          } else {
            setAvatarTokenError("");
          }
        } catch (e) {
          if (e instanceof Error) {
            try {
              const response = JSON.parse(e.message);
              if (response.error) {
                setAvatarContractError(response.error);
              } else {
                setAvatarContractError(e.message);
              }
            } catch (_) {
              setAvatarContractError(e.message);
            }
          } else {
            setAvatarContractError(e as string);
          }
          return;
        }

        const { result: uriResult } = await nftContract!.functions.uri({});

        if (uriResult?.value) {
          const buffer = utils.toUint8Array(
            localProfile.avatar_token_id.substring(2)
          );
          const tokenId = new TextDecoder().decode(buffer);
          const uri = normalizeIpfsUris(uriResult.value as string);
          try {
            const metadata = await fetch(`${uri}/${tokenId}`);
            const { image } = await metadata.json();
            const imageSrc = normalizeIpfsUris(image);
            setLocalAvatarSrc(imageSrc);
            setIsAvatarLoading(false);
          } catch (e) {
            setAvatarTokenError("Could not find NFT image");
          }
        }
      }
    };
    fetchAvatarSrc();
  }, [
    localProfile?.avatar_contract_id,
    localProfile?.avatar_token_id,
    address,
    provider,
  ]);

  const socialLinkSetter = (key: string, value: string) => {
    const links = localProfile?.links?.filter((link) => link.key !== key) || [];
    setLocalProfile({
      ...localProfile,
      links: [...links, { key, value }],
    } as ProfileObject);
    setHasChanges(true);
  };

  const themeSetter = (theme: string) => {
    setLocalProfile({
      ...localProfile,
      theme,
    } as ProfileObject);
    setIsThemeLight(isThemeColorLight(theme));
    setHasChanges(true);
  };

  const nameSetter = (name: string) => {
    setLocalProfile({
      ...localProfile,
      name,
    } as ProfileObject);
    setHasChanges(true);
  };

  const avatarContractSetter = (avatar_contract_id: string) => {
    setLocalProfile({
      ...localProfile,
      avatar_contract_id,
    } as ProfileObject);
    setHasChanges(true);
  };

  const avatarTokenSetter = (token: string) => {
    const buffer = new TextEncoder().encode(token);
    const avatar_token_id = `0x${utils.toHexString(buffer)}`;
    setLocalProfile({
      ...localProfile,
      avatar_token_id,
    } as ProfileObject);
    setHasChanges(true);
  };

  const bioSetter = (bio: string) => {
    setBioHasError(bio.length > 160);
    setLocalProfile({
      ...localProfile,
      bio,
    } as ProfileObject);
    setHasChanges(true);
  };

  useEffect(() => {
    if (profile) {
      setLocalProfile({
        ...profile,
        avatar_token_id:
          profile.avatar_token_id === "0x" ? "" : profile.avatar_token_id,
      });
      setIsThemeLight(profile.theme ? isThemeColorLight(profile.theme) : true);
      setValue(`https://kap.plus/${profile?.name}`);
      setLocalAvatarSrc("");
      setAvatarContractError("");
      setAvatarTokenError("");
      setIsAvatarLoading(false);
    }
  }, [profile]);

  return (
    <Skeleton isLoaded={!!localProfile} borderRadius="md">
      <Card
        variant="outline"
        background={`#${theme}`}
        color={isThemeLight ? "gray.800" : "white"}
      >
        <CardHeader>
          <Flex justifyContent="space-between" width="100%" gap="2">
            <Heading fontSize="2xl">Your Profile</Heading>

            {profile?.name && (
              <Popover
                placement="bottom-start"
                onOpen={() => {
                  onCopy();
                }}
              >
                <PopoverTrigger>
                  <Button
                    variant="solid"
                    background={
                      isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"
                    }
                    _hover={{
                      background: isThemeLight
                        ? "blackAlpha.200"
                        : "whiteAlpha.200",
                    }}
                    _active={{
                      background: isThemeLight
                        ? "blackAlpha.200"
                        : "whiteAlpha.200",
                    }}
                    rightIcon={<FaShare />}
                    isDisabled={hasChanges}
                  >
                    Share
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody>
                    <Card variant="outline" padding="2">
                      <Link
                        target="_blank"
                        href={`https://kap.plus/${profile?.name}`}
                      >
                        https://kap.plus/{profile?.name} <ExternalLinkIcon mb="1" />
                      </Link>
                    </Card>
                    <Text>
                      Link copied to your clipboard! Click to view your public
                      profile.
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            )}
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack alignItems="center" maxWidth="30em" margin="0 auto" gap="2">
            <Box position="relative">
              <Avatar size="12em" src={localAvatarSrc} />
              <Box
                background={
                  !!avatarContractError || !!avatarTokenError
                    ? "red.500"
                    : `#${theme}`
                }
                color={
                  !!avatarContractError || !!avatarTokenError
                    ? "white"
                    : "inherit"
                }
                borderColor={`#${theme}`}
                borderWidth="4px"
                position="absolute"
                right="0"
                bottom="0"
                borderRadius="50%"
              >
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      variant="solid"
                      background={
                        isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"
                      }
                      icon={<FaCamera />}
                      aria-label="Change NFT Avatar"
                      borderRadius="50%"
                      size="lg"
                      _hover={{
                        background: isThemeLight
                          ? "blackAlpha.200"
                          : "whiteAlpha.200",
                      }}
                      _active={{
                        background: isThemeLight
                          ? "blackAlpha.200"
                          : "whiteAlpha.200",
                      }}
                      isDisabled={isUpdating}
                    />
                  </PopoverTrigger>
                  <PopoverContent color={popoverColor} padding={2}>
                    <Stack>
                      <Input
                        placeholder="NFT Contract Address"
                        isInvalid={!!avatarContractError}
                        value={localProfile?.avatar_contract_id || ""}
                        onChange={(e) => avatarContractSetter(e.target.value)}
                        autoFocus
                        variant="outline"
                        size="lg"
                      />
                      <Input
                        placeholder="NFT Token Id"
                        isInvalid={!!avatarTokenError}
                        value={tokenId}
                        onChange={(e) => avatarTokenSetter(e.target.value)}
                        autoFocus
                        variant="outline"
                        size="lg"
                      />
                      {avatarContractError || avatarTokenError ? (
                        <Card bg="red.500" color="white" padding="3">
                          {avatarContractError || avatarTokenError}
                        </Card>
                      ) : isAvatarLoading ? (
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          padding="2"
                        >
                          <Spinner />
                        </Flex>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </PopoverContent>
                </Popover>
              </Box>
            </Box>
            <Flex>
              {names.length === 0 ? (
                <Text fontSize="4xl" lineHeight="1">
                  No name
                </Text>
              ) : (
                <>
                  <Menu placement="bottom">
                    <MenuButton
                      as={Button}
                      aria-label="Change Primary Account Name"
                      variant="solid"
                      size="lg"
                      paddingInlineEnd="1"
                      paddingInlineStart="4"
                      fontSize="4xl"
                      color={isThemeLight ? "gray.800" : "white"}
                      background={
                        isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"
                      }
                      _hover={{
                        background: isThemeLight
                          ? "blackAlpha.200"
                          : "whiteAlpha.200",
                      }}
                      _active={{
                        background: isThemeLight
                          ? "blackAlpha.200"
                          : "whiteAlpha.200",
                      }}
                      isDisabled={isUpdating}
                    >
                      {localProfile?.name || "Pick a name"}
                      <ChevronDownIcon />
                    </MenuButton>
                    <MenuList
                      fontSize="lg"
                      color={popoverColor}
                      maxWidth="100vw"
                    >
                      {names
                        .map(({ name, domain }) => `${name}.${domain}`)
                        .sort()
                        .map((name) => (
                          <MenuItem
                            key={name}
                            onClick={() => nameSetter(name)}
                            icon={
                              name === localProfile?.name ? (
                                <StarIcon mb="1" />
                              ) : (
                                <span
                                  style={{ display: "block", width: "1em" }}
                                />
                              )
                            }
                          >
                            <Text overflowWrap="break-word" maxWidth="100%">
                              {name}
                            </Text>
                          </MenuItem>
                        ))}
                    </MenuList>
                  </Menu>
                </>
              )}
            </Flex>
            <Textarea
              placeholder="I like long walks on the beach..."
              label="Bio"
              max={160}
              isThemeLight={isThemeLight}
              value={localProfile?.bio || ""}
              setValue={bioSetter}
              disabled={isUpdating}
            />
            <SocialLinks
              values={localProfile?.links || []}
              setValue={socialLinkSetter}
              isThemeLight={isThemeLight}
              disabled={isUpdating}
            />
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex justifyContent="space-between" width="100%" gap="2">
            <ColorPicker
              value={theme}
              setValue={themeSetter}
              hasError={themeHasError}
              setHasError={setThemeHasError}
              background={isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"}
              _hover={{
                background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
              }}
              _focusVisible={{
                background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
              }}
              _placeholder={{
                color: isThemeLight ? "gray.600" : "gray.300",
              }}
              isDisabled={isUpdating}
            />
            <Button
              onClick={async () => {
                const success = await updateProfile(localProfile!);
                if (success) setHasChanges(false);
              }}
              isLoading={isUpdating}
              isDisabled={
                !hasChanges ||
                themeHasError ||
                bioHasError ||
                !!avatarContractError ||
                !!avatarTokenError ||
                isAvatarLoading
              }
              variant="solid"
              background={isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"}
              _hover={{
                background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
              }}
              _active={{
                background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
              }}
            >
              Save Changes
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Skeleton>
  );
}

function isThemeColorLight(hexcolor: string) {
  let rs, gs, bs;
  if (hexcolor.length === 6) {
    rs = hexcolor.substring(0, 2);
    gs = hexcolor.substring(2, 4);
    bs = hexcolor.substring(4);
  } else if (hexcolor.length === 3) {
    rs = hexcolor.substring(0, 1).repeat(2);
    gs = hexcolor.substring(1, 2).repeat(2);
    bs = hexcolor.substring(2).repeat(2);
  } else {
    return false;
  }
  const r = parseInt(rs, 16);
  const g = parseInt(gs, 16);
  const b = parseInt(bs, 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128;
}
