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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Avatar from "../components/Avatar";
import Textarea from "../components/Textarea";
import SocialLinks from "../components/SocialLinks";
import { useEffect, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import ColorPicker from "./ColorPicker";
import { NameObject } from "../context/NameServiceProvider";
import { ProfileObject, useProfile } from "../context/ProfileProvider";

interface ProfileFormProps {
  names: NameObject[];
}

export default function ProfileForm({ names }: ProfileFormProps) {
  const { profile, updateProfile, isUpdating } = useProfile();
  const [localProfile, setLocalProfile] = useState(profile);
  const [isThemeLight, setIsThemeLight] = useState(true);
  const popoverColor = useColorModeValue("gray.800", "white");
  const theme = localProfile?.theme || "fff";

  const socialLinkSetter = (key: string, value: string) => {
    const links = localProfile?.links?.filter((link) => link.key !== key) || [];
    setLocalProfile({
      ...localProfile,
      links: [...links, { key, value }],
    } as ProfileObject);
  };

  const themeSetter = (theme: string) => {
    setLocalProfile({
      ...localProfile,
      theme,
    } as ProfileObject);
    setIsThemeLight(isThemeColorLight(theme));
  };

  const nameSetter = (name: string) => {
    setLocalProfile({
      ...localProfile,
      name,
    } as ProfileObject);
  };

  const avatarContractSetter = (avatar_contract_id: string) => {
    setLocalProfile({
      ...localProfile,
      avatar_contract_id,
    } as ProfileObject);
  };

  const avatarTokenSetter = (avatar_token_id: string) => {
    setLocalProfile({
      ...localProfile,
      avatar_token_id,
    } as ProfileObject);
  };

  const bioSetter = (bio: string) => {
    setLocalProfile({
      ...localProfile,
      bio,
    } as ProfileObject);
  };

  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
      setIsThemeLight(profile.theme ? isThemeColorLight(profile.theme) : true);
    }
  }, [profile]);

  return (
    <Card
      variant="outline"
      background={`#${theme}`}
      color={isThemeLight ? "gray.800" : "white"}
    >
      <CardHeader>
        <Heading fontSize="2xl">Your Profile</Heading>
      </CardHeader>
      <CardBody>
        <Stack alignItems="center" maxWidth="30em" margin="0 auto" gap="2">
          <Box position="relative">
            {/* TODO Loading, show selected NFT */}
            <Avatar size="12em" />
            <Box
              background={`#${theme}`}
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
                  />
                </PopoverTrigger>
                <PopoverContent color={popoverColor} padding={2}>
                  <Stack>
                    <Input
                      placeholder="NFT Contract Address"
                      value={localProfile?.avatar_contract_id}
                      onChange={(e) => avatarContractSetter(e.target.value)}
                      autoFocus
                      variant="outline"
                      size="lg"
                    />
                    <Input
                      placeholder="NFT Token Id"
                      value={localProfile?.avatar_token_id}
                      onChange={(e) => avatarTokenSetter(e.target.value)}
                      autoFocus
                      variant="outline"
                      size="lg"
                    />
                  </Stack>
                </PopoverContent>
              </Popover>
            </Box>
          </Box>
          <Flex>
            <Text fontSize="4xl" lineHeight="1">
              {localProfile?.name}
            </Text>
            <Menu placement="bottom">
              <MenuButton
                as={IconButton}
                icon={<FaPencilAlt />}
                aria-label="Change Primary Account Name"
                variant="ghost"
                color={isThemeLight ? "gray.800" : "white"}
              />
              <MenuList fontSize="lg" color={popoverColor} maxWidth="100vw">
                {names.map(({ name, domain }) => (
                  <MenuItem
                    key={`${name}.${domain}`}
                    onClick={() => nameSetter(`${name}.${domain}`)}
                  >
                    <Text overflowWrap="break-word" maxWidth="100%">
                      {name}.{domain}
                    </Text>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
          <Textarea
            placeholder="I like long walks on the beach..."
            label="Bio"
            max={160}
            isThemeLight={isThemeLight}
            value={localProfile?.bio || ""}
            setValue={bioSetter}
          />
          <SocialLinks
            values={localProfile?.links || []}
            setValue={socialLinkSetter}
            isThemeLight={isThemeLight}
          />
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex justifyContent="space-between" width="100%" gap="2">
          <ColorPicker
            value={theme}
            setValue={themeSetter}
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
          />
          <Button
            onClick={() => updateProfile(localProfile!)}
            isLoading={isUpdating}
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
