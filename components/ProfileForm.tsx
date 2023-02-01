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
  Stack,
  Text,
} from "@chakra-ui/react";
import Avatar from "../components/Avatar";
import Textarea from "../components/Textarea";
import { useAccount } from "../context/AccountProvider";
import SocialLinks from "../components/SocialLinks";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import ColorPicker from "./ColorPicker";

export default function ProfileForm() {
  const [themeColor, setThemeColor] = useState("ffffff");
  const [isThemeLight, setIsThemeLight] = useState(true);

  const { address, primaryUsername, primaryAvatarSrc } = useAccount();
  const [socialLinks, setSocialLinks] = useState({});
  const socialLinkSetter = (key: string, value: string) => {
    setSocialLinks({
      ...socialLinks,
      [key]: value,
    });
  };

  useEffect(() => {
    setIsThemeLight(isThemeColorLight(themeColor));
  }, [themeColor]);

  return (
    <Card
      variant="outline"
      background={`#${themeColor}`}
      color={isThemeLight ? "gray.800" : "white"}
    >
      <CardHeader>
        <Heading fontSize="2xl">Your Profile</Heading>
      </CardHeader>
      <CardBody>
        <Stack alignItems="center" maxWidth="30em" margin="0 auto">
          <Box position="relative">
            <Avatar size="12em" src={primaryAvatarSrc} address={address} />
            <Box
              background={`#${themeColor}`}
              borderColor={`#${themeColor}`}
              borderWidth="4px"
              position="absolute"
              right="0"
              bottom="0"
              borderRadius="50%"
            >
              <IconButton
                variant="solid"
                background={isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"}
                icon={<FaPencilAlt />}
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
            </Box>
          </Box>
          <Text fontSize="4xl">{primaryUsername}</Text>
          <Textarea
            placeholder="I like long walks on the beach..."
            label="Bio"
            max={160}
            isThemeLight={isThemeLight}
          />
          <SocialLinks
            values={socialLinks}
            setValue={socialLinkSetter}
            isThemeLight={isThemeLight}
          />
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex justifyContent="space-between" width="100%" gap="2">
          <ColorPicker
            value={themeColor}
            setValue={setThemeColor}
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
