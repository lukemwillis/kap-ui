import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Link,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import Avatar from "../components/Avatar";
import { ICONS, SocialKeys } from "../components/SocialLinks";
import { useEffect, useState } from "react";
import {
  nftAbi,
  normalizeIpfsUris,
  ProfileObject,
} from "../context/ProfileProvider";
import { Contract, utils } from "koilib";
import { useAccount } from "../context/AccountProvider";
import { Abi } from "koilib/lib/interface";
import profileAbiJson from "../contract/abi/profile-abi.json";
import { useNameService } from "../context/NameServiceProvider";

const profileAbi: Abi = {
  koilib_types: profileAbiJson.types,
  ...profileAbiJson,
};

interface ProfileProps {
  name: string;
}

export default function Profile({ name }: ProfileProps) {
  const { provider } = useAccount();
  const { getOwner } = useNameService();
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState<ProfileObject>();
  const [isThemeLight, setIsThemeLight] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState("");
  const theme = profile?.theme || "fff";

  useEffect(() => {
    const profileContract = new Contract({
      id: process.env.NEXT_PUBLIC_PROFILE_ADDR,
      abi: profileAbi,
      provider,
    });

    const fetchProfile = async () => {
      const ownerResult = await getOwner(name);
      if (ownerResult) {
        setAddress(ownerResult.value);
        const { result: profileResult } =
          await profileContract!.functions.get_profile<ProfileObject>({
            address: ownerResult.value,
          });
        setProfile(profileResult || {});

        if (profileResult?.theme) {
          setIsThemeLight(isThemeColorLight(profileResult.theme));
        }

        if (
          profileResult?.avatar_contract_id &&
          profileResult.avatar_token_id
        ) {
          const nftContract = new Contract({
            id: profileResult.avatar_contract_id,
            abi: nftAbi,
            provider,
          });

          const { result: nftResult } = await nftContract!.functions.uri({});

          if (nftResult?.value) {
            try {
              const uri = normalizeIpfsUris(nftResult.value as string);
              const metadata = await fetch(
                `${uri}/${profileResult.avatar_token_id}`
              );
              const { image } = await metadata.json();
              const imageSrc = normalizeIpfsUris(image);
              setAvatarSrc(imageSrc);
            } catch {
              // TODO don't just swallow error
            }
          }
        } else {
          setAvatarSrc("");
        }
      }
    };
    fetchProfile();
  }, [name]);

  if (
    typeof profile !== "undefined" &&
    !profile.name &&
    !profile.theme &&
    !profile.bio &&
    !profile.links &&
    !profile.avatar_contract_id &&
    !profile.avatar_token_id
  ) {
    return (
      <Card
        variant="outline"
        padding="20"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text mb="3">Owner has not set up their profile</Text>
        <Button
          as={Link}
          href={`https://koinosblocks.com/address/${address}`}
          target="_blank"
        >
          View Address on Koinosblocks
        </Button>
      </Card>
    );
  }
  return (
    <Skeleton isLoaded={!!profile} borderRadius="md">
      <Card
        variant="outline"
        background={`#${theme}`}
        color={isThemeLight ? "gray.800" : "white"}
      >
        <CardHeader>
          <Heading fontSize="2xl">Current owner</Heading>
        </CardHeader>
        <CardBody>
          <Stack
            alignItems="center"
            maxWidth="30em"
            margin="0 auto"
            gap="2"
            paddingBottom="8"
          >
            {profile?.avatar_contract_id && profile.avatar_token_id ? (
              <SkeletonCircle width="12em" height="12em" isLoaded={!!avatarSrc}>
                <Avatar size="12em" src={avatarSrc} />
              </SkeletonCircle>
            ) : (
              <Flex
                width="12em"
                height="12em"
                borderRadius="50%"
                background="gray.400"
                justifyContent="center"
                alignItems="center"
              >
                No Avatar Set
              </Flex>
            )}
            <Text fontSize="4xl" lineHeight="1">
              {profile?.name}
            </Text>
            <Text textAlign="center">{profile?.bio}</Text>
            <Flex
              gap="2"
              flexWrap="wrap"
              justifyContent="center"
              maxWidth="20em"
            >
              {profile?.links?.map(({ key, value }) => {
                const link = getLink(key, value);
                return (
                  <IconButton
                    as={Link}
                    aria-label={key}
                    key={key}
                    icon={ICONS[key as SocialKeys]}
                    variant="outline"
                    size="lg"
                    borderRadius="50%"
                    borderColor={
                      isThemeLight ? "blackAlpha.400" : "whiteAlpha.400"
                    }
                    _hover={{
                      background: isThemeLight
                        ? "blackAlpha.200"
                        : "whiteAlpha.200",
                    }}
                    href={link}
                    target="_blank"
                  />
                );
              })}
            </Flex>
          </Stack>
        </CardBody>
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

export function getLink(key: string, value: string) {
  switch (key) {
    case SocialKeys.BTC:
      return `https://blockstream.info/address/${value}`;
    case SocialKeys.ETH:
      return `https://etherscan.io/address/${value}`;
    case SocialKeys.EMAIL:
      return `mailto:${value}`;
    case SocialKeys.WEBSITE:
      return `https://${value}`;
    case SocialKeys.GITHUB:
      return `https://github.com/${value}`;
    case SocialKeys.REDDIT:
      return `https://reddit.com/u/${value}`;
    case SocialKeys.DISCORD:
      return `https://discord.com/users/${value}`;
    case SocialKeys.TELEGRAM:
      return `https://t.me/${value}`;
    case SocialKeys.TWITTER:
      return `https://twitter.com/${value}`;
  }
}
