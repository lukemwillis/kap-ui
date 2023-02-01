import { AddIcon, EmailIcon } from "@chakra-ui/icons";
import {
  FaGlobe,
  FaGithub,
  FaDiscord,
  FaTwitter,
  FaRedditAlien,
  FaTelegramPlane,
  FaEthereum,
  FaBitcoin,
} from "react-icons/fa";
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

enum SocialKeys {
  WEBSITE = "website",
  EMAIL = "email",
  GITHUB = "github",
  TWITTER = "twitter",
  REDDIT = "reddit",
  DISCORD = "discord",
  TELEGRAM = "telegram",
  ETH = "eth",
  BTC = "btc",
}

type SocialLinksType = {
  [key in SocialKeys]?: string;
};

interface SocialLinksProps {
  values: SocialLinksType;
  setValue: (key: SocialKeys, val: string) => void;
  isThemeLight: boolean;
}

const LABELS = {
  [SocialKeys.WEBSITE]: "Website",
  [SocialKeys.EMAIL]: "Email",
  [SocialKeys.GITHUB]: "Github",
  [SocialKeys.TWITTER]: "Twitter",
  [SocialKeys.REDDIT]: "Reddit",
  [SocialKeys.DISCORD]: "Discord",
  [SocialKeys.TELEGRAM]: "Telegram",
  [SocialKeys.ETH]: "Ethereum Address",
  [SocialKeys.BTC]: "Bitcoin Address",
};

const ICONS = {
  [SocialKeys.WEBSITE]: <FaGlobe />,
  [SocialKeys.EMAIL]: <EmailIcon />,
  [SocialKeys.GITHUB]: <FaGithub />,
  [SocialKeys.TWITTER]: <FaTwitter />,
  [SocialKeys.REDDIT]: <FaRedditAlien />,
  [SocialKeys.DISCORD]: <FaDiscord />,
  [SocialKeys.TELEGRAM]: <FaTelegramPlane />,
  [SocialKeys.ETH]: <FaEthereum />,
  [SocialKeys.BTC]: <FaBitcoin />,
};

export default function SocialLinks({
  values,
  setValue,
  isThemeLight,
}: SocialLinksProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lastKey, setLastKey] = useState("");
  const popoverColor = useColorModeValue("gray.800", "white");
  return (
    <Flex gap="2">
      {Object.values(SocialKeys)
        .filter((key) => typeof values[key as SocialKeys] !== "undefined")
        .map((key) => (
          <Popover
            key={key}
            onOpen={() => {
              setLastKey(key);
              onOpen();
            }}
            onClose={() => {
              setLastKey("");
              onClose();
            }}
            isOpen={lastKey === key && isOpen}
          >
            <PopoverTrigger>
              <IconButton
                icon={ICONS[key as SocialKeys]}
                aria-label={`Change ${LABELS[key as SocialKeys]}`}
                variant="solid"
                background={isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"}
                size="lg"
                borderRadius="50%"
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
              <InputGroup>
                <Input
                  placeholder={LABELS[key as SocialKeys]}
                  value={values[key]}
                  onChange={(e) => setValue(key, e.target.value)}
                  autoFocus
                  variant="outline"
                />
                <InputLeftElement>{ICONS[key as SocialKeys]}</InputLeftElement>
              </InputGroup>
            </PopoverContent>
          </Popover>
        ))}
      {Object.keys(values).length < Object.values(SocialKeys).length && (
        <Menu placement="bottom">
          {Object.keys(values).length > 0 ? (
            <MenuButton
              as={IconButton}
              icon={<AddIcon />}
              aria-label="Add Social Links"
              variant="solid"
              background={isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"}
              size="lg"
              borderRadius="50%"
              _hover={{
                background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
              }}
              _active={{
                background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
              }}
            />
          ) : (
            <MenuButton
              as={Button}
              leftIcon={<AddIcon />}
              variant="solid"
              background={isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"}
              _hover={{
                background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
              }}
              _active={{
                background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
              }}
            >
              Add Social Links
            </MenuButton>
          )}
          <MenuList color={popoverColor}>
            {Object.values(SocialKeys)
              .filter((key) => typeof values[key as SocialKeys] === "undefined")
              .map((key) => (
                <MenuItem
                  onClick={() => {
                    setLastKey(key);
                    setValue(key as SocialKeys, "");
                    onOpen();
                  }}
                  icon={ICONS[key as SocialKeys]}
                  key={key}
                >
                  {LABELS[key as SocialKeys]}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}
