import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useToast,
  StackDivider,
  IconButton,
  Flex,
  useDisclosure,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { ReactElement, useRef } from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import SearchBox from "./SearchBox";
import ConnectWallet from "./ConnectWallet";

interface ConnectorProps {
  onConnect?: () => void;
  sitePreferences?: ReactElement;
}

export default function AccountConnector({
  onConnect,
  sitePreferences,
}: ConnectorProps) {
  const {
    address,
    isConnecting,
    primaryUsername,
    primaryAvatarSrc,
  } = useAccount();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { onCopy, hasCopied } = useClipboard(address || "");
  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-end"
      initialFocusRef={inputRef}
    >
      <PopoverTrigger>
        <Button
          variant={address ? "ghost" : "outline"}
          isLoading={isConnecting}
          minWidth="unset"
          height="auto"
          padding={address ? "2" : "3.5"}
          borderColor={useColorModeValue("gray.800", "white")}
        >
          {address && !isConnecting ? (
            <Flex gap="2" alignItems="center">
              <Avatar size="2.6em" src={primaryAvatarSrc} address={address} />
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
      <PopoverContent
        width="auto"
        maxWidth="100vw"
        boxShadow="lg"
      >
        <PopoverBody padding="3">
          <Stack spacing="2">
            {address && (
              <>
                <Flex direction="column" alignItems="center" gap="4">
                  <Avatar size="8em" src={primaryAvatarSrc} address={address} />
                  {primaryUsername ? (
                    <Text fontSize="1.5em" lineHeight="1">
                      {primaryUsername}
                    </Text>
                  ) : (
                    <SearchBox
                      placeholder="Pick a username..."
                      buttonLabel="Search"
                      inlineButton
                      onSearch={onClose}
                      inputRef={inputRef}
                    />
                  )}
                  <Flex
                    borderColor="gray.500"
                    borderWidth="1px"
                    borderRadius={8}
                    alignItems="center"
                    paddingLeft="2"
                    color="gray.500"
                    gap="1"
                  >
                    <Text fontSize="0.9em" overflowWrap="anywhere">
                      {address}
                    </Text>
                    <IconButton
                      aria-label={hasCopied ? "Copied!" : "Copy"}
                      onClick={onCopy}
                      size="sm"
                      variant="ghost"
                      color="gray.500"
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
                      color="gray.500"
                      _before={{
                        background: "gray.500",
                        content: '""',
                        flexGrow: 1,
                        height: "1px",
                      }}
                      _after={{
                        background: "gray.500",
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
                  color="gray.500"
                  _before={{
                    background: "gray.500",
                    content: '""',
                    flexGrow: 1,
                    height: "1px",
                  }}
                  _after={{
                    background: "gray.500",
                    content: '""',
                    flexGrow: 1,
                    height: "1px",
                  }}
                >
                  connect another wallet
                </StackDivider>
              </>
            )}
            <ConnectWallet onConnect={onConnect} onClick={onClose} />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
