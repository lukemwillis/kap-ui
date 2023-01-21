import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useToast,
  Image,
  StackDivider,
  useTheme,
  IconButton,
  Flex,
  useDisclosure,
  useClipboard,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { ReactElement } from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import Search from "./Search";

interface ConnectorProps {
  onConnect?: () => void;
  sitePreferences?: ReactElement;
}

export default function AccountConnector({
  onConnect,
  sitePreferences,
}: ConnectorProps) {
  const {
    colors: { gray },
  } = useTheme();
  const {
    address,
    isConnecting,
    connectKondor,
    connectMKW,
    isMKWSupported,
    primaryUsername,
    primaryAvatarSrc,
  } = useAccount();
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { onCopy, hasCopied } = useClipboard(address || "");

  const connectCallback = async (wallet: "Kondor" | "MKW") => {
    let connected = false;

    onClose();

    if (wallet === "Kondor") {
      connected = await connectKondor();
    } else if (wallet === "MKW") {
      connected = await connectMKW();
    }

    if (!connected) {
      toast({
        title: `Failed to connect with ${wallet}`,
        description: `Please check that you have ${wallet} ${
          wallet === "Kondor" ? "installed" : "set up"
        } in this browser and try again.`,
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (onConnect) {
      onConnect();
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Button
          variant={address ? "ghost" : "outline"}
          isLoading={isConnecting}
          minWidth="unset"
          height="auto"
          padding={address ? "2" : "3"}
          borderColor={useColorModeValue("black", "white")}
        >
          {address && !isConnecting ? (
            <Flex gap="2" alignItems="center">
              <Avatar size="40px" src={primaryAvatarSrc} address={address} />
              <Stack alignItems="start" lineHeight="1">
                {primaryUsername && (
                  <Text fontSize="1.2em">{primaryUsername}</Text>
                )}
                <Text
                  fontSize={primaryUsername ? "0.9em" : "1.3em"}
                  color="gray.500"
                  fontWeight="normal"
                >
                  {address.substring(0, 4)}...
                  {address.substring(address.length - 4)}
                </Text>
              </Stack>
            </Flex>
          ) : (
            <Text fontWeight="bold">Connect Wallet</Text>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent width="auto" maxWidth="100vw">
        <PopoverBody padding="3">
          <Stack spacing="2">
            {address && (
              <>
                <Flex direction="column" alignItems="center" gap="4">
                  <Avatar
                    size="128px"
                    src={primaryAvatarSrc}
                    address={address}
                  />
                  {primaryUsername ? (
                    <Text fontSize="1.5em" lineHeight="1">
                      {primaryUsername}
                    </Text>
                  ) : (
                    <Search
                      placeholder="Pick a username..."
                      buttonLabel="Search"
                      inlineButton
                      onSearch={onClose}
                    />
                  )}
                  <Flex     
                    borderColor={gray[500]}
                    borderWidth="1px"
                    borderRadius={8}
                    alignItems="center"
                    paddingLeft="2"
                    color={gray[500]}
                    gap="1"
                  >
                    <Text fontSize="0.9em">{address}</Text>
                    <IconButton
                      aria-label={hasCopied ? "Copied!" : "Copy"}
                      onClick={onCopy}
                      size="sm"
                      variant="ghost"
                      color={gray[500]}
                    >
                      {hasCopied ? <CheckIcon /> : <CopyIcon />}
                    </IconButton>
                  </Flex>
                  {primaryUsername && (
                    <Link href="/dashboard">
                      <Button variant="outline" onClick={onClose}>
                        Manage KAP Account
                      </Button>
                    </Link>
                  )}
                </Flex>
                {sitePreferences && (
                  <>
                    <StackDivider
                      display="flex"
                      alignItems="center"
                      gap="2"
                      color={gray[500]}
                      _before={{
                        background: gray[500],
                        content: '""',
                        flexGrow: 1,
                        height: "1px",
                      }}
                      _after={{
                        background: gray[500],
                        content: '""',
                        flexGrow: 1,
                        height: "1px",
                      }}
                    >
                      site preferences
                    </StackDivider>
                    {sitePreferences}
                  </>
                )}
                <StackDivider
                  display="flex"
                  alignItems="center"
                  gap="2"
                  color={gray[500]}
                  _before={{
                    background: gray[500],
                    content: '""',
                    flexGrow: 1,
                    height: "1px",
                  }}
                  _after={{
                    background: gray[500],
                    content: '""',
                    flexGrow: 1,
                    height: "1px",
                  }}
                >
                  connect another wallet
                </StackDivider>
              </>
            )}
            <Flex gap="2">
              <IconButton
                onClick={() => connectCallback("Kondor")}
                aria-label="Connect with Kondor"
                flex="1"
                height="auto"
                padding="4"
                icon={
                  <Image src="/kondor-logo.png" alt="Kondor Logo" height={16} />
                }
              />
              <Tooltip
                placement="top-end"
                label={
                  isMKWSupported
                    ? ""
                    : "MKW requires support for 'cross-site cookies'. Please check your browser settings if you want to connect with MKW."
                }
              >
                <IconButton
                  onClick={() => connectCallback("MKW")}
                  aria-label="Connect with MKW"
                  flex="1"
                  height="auto"
                  padding="4"
                  disabled={!isMKWSupported}
                  icon={
                    <Image src="/mkw-logo.png" alt="MKW Logo" height={16} />
                  }
                />
              </Tooltip>
            </Flex>
            {!address ? (
              <>
                <StackDivider
                  display="flex"
                  alignItems="center"
                  gap="2"
                  color={gray[500]}
                  _before={{
                    background: gray[500],
                    content: '""',
                    flexGrow: 1,
                    height: "1px",
                  }}
                  _after={{
                    background: gray[500],
                    content: '""',
                    flexGrow: 1,
                    height: "1px",
                  }}
                >
                  need a wallet?
                </StackDivider>
                <Button
                  as="a"
                  href="https://chrome.google.com/webstore/detail/kondor/ghipkefkpgkladckmlmdnadmcchefhjl"
                  target="_blank"
                  justifyContent="start"
                  leftIcon={
                    <Flex width="6" justifyContent="center">
                      <Image
                        src="/kondor-logo.png"
                        alt="Kondor Logo"
                        height={6}
                      />
                    </Flex>
                  }
                >
                  Install Kondor Wallet
                </Button>
                <Button
                  as="a"
                  href="https://mykw.vercel.app"
                  target="_blank"
                  justifyContent="start"
                  leftIcon={
                    <Image src="/mkw-logo.png" alt="MKW Logo" height={6} />
                  }
                >
                  Set up My Koinos Wallet
                </Button>
              </>
            ) : (
              ""
            )}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
