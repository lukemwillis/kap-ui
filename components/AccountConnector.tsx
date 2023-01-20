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
import KAPName from "./KAPName";

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
  const { account, isConnecting, connectKondor, connectMKW, isMKWSupported } =
    useAccount();
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { onCopy, hasCopied } = useClipboard(account || "");

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
          variant={account ? "ghost" : "outline"}
          isLoading={isConnecting}
          minWidth="unset"
          height="auto"
          padding={account ? "2" : "3"}
          borderColor={useColorModeValue("black", "white")}
        >
          {(account && !isConnecting) ? (
            <Flex gap="2" alignItems="center">
              <Avatar size="40px" />
              <Stack alignItems="start" lineHeight="1">
                <Text fontSize="1.2em">
                  <KAPName />
                </Text>
                <Text fontSize="0.9em" color="gray.500" fontWeight="normal">
                  {account.substring(0, 4)}...
                  {account.substring(account.length - 4)}
                </Text>
              </Stack>
            </Flex>
          ) : (
            <Text fontWeight="bold">Connect Wallet</Text>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverBody padding="3">
          <Stack spacing="2">
            {!!account ? (
              <>
                <Flex direction="column" alignItems="center" gap="2">
                  <Avatar size="128px" />
                  <Text fontSize="1.5em">
                    <KAPName />
                  </Text>
                  <Flex
                    borderColor={gray[500]}
                    borderWidth="1px"
                    borderRadius={8}
                    alignItems="center"
                    paddingLeft="2"
                    color={gray[500]}
                    gap="1"
                  >
                    <Text fontSize="0.9em">{account}</Text>
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
                  <Button variant="outline" marginTop="2">
                    Manage KAP Account
                  </Button>
                </Flex>
                {sitePreferences ? (
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
                ) : (
                  ""
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
            ) : (
              ""
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
            {!account ? (
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
                  rightIcon={
                    <Image
                      src="/kondor-logo.png"
                      alt="Kondor Logo"
                      height={6}
                    />
                  }
                >
                  Install Kondor Wallet
                </Button>
                <Button
                  as="a"
                  href="https://mykw.vercel.app"
                  target="_blank"
                  rightIcon={
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
