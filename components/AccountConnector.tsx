import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  StackDivider,
  IconButton,
  Flex,
  useDisclosure,
  useClipboard,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";
import { CheckIcon, CopyIcon, WarningIcon } from "@chakra-ui/icons";
import { ReactElement, useEffect, useRef } from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import SearchBox from "./SearchBox";
import ConnectWallet from "./ConnectWallet";
import { useProfile } from "../context/ProfileProvider";
import { useNameService } from "../context/NameServiceProvider";
import CTA from "./CTA";
import { useRouter } from "next/router";

interface ConnectorProps {
  onConnect?: () => void;
  sitePreferences?: ReactElement;
}

export default function AccountConnector({
  onConnect,
  sitePreferences,
}: ConnectorProps) {
  const router = useRouter();
  const { address, isConnecting } = useAccount();
  const { names } = useNameService();
  const { profile } = useProfile();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { onCopy, setValue, hasCopied } = useClipboard(address || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (address) {
      setValue(address);
    }
  }, [address, setValue]);

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
              <Box position="relative">
                <Avatar size="2.6em" />
                {/* TODO show badge if any will expire soon */}
                {names.length > 0 &&
                  !profile?.name &&
                  router.route !== "/account" && (
                    <WarningIcon
                      color="brand.orange"
                      position="absolute"
                      top="-1"
                      right="-1"
                    />
                  )}
              </Box>
              <Stack alignItems="start" lineHeight="1">
                {profile?.name && <Text fontSize="1.2em">{profile.name}</Text>}
                <Text
                  fontSize={profile?.name ? "0.9em" : "1.3em"}
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
      <PopoverContent width="auto" maxWidth="100vw" boxShadow="lg">
        <PopoverBody padding="3">
          <Stack spacing="2">
            {address && (
              <>
                <Flex direction="column" alignItems="center" gap="4">
                  <Avatar size="8em" />
                  {profile?.name ? (
                    <Text fontSize="1.5em" lineHeight="1">
                      {profile.name}
                    </Text>
                  ) : (
                    names.length === 0 && (
                      <SearchBox
                        placeholder="Pick a username..."
                        buttonLabel="Search"
                        inlineButton
                        onSearch={onClose}
                        inputRef={inputRef}
                      />
                    )
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
                  {names.length > 0 && (
                    <Link href="/account">
                      {/* TODO change CTA if names will expire soon */}
                      {profile?.name ? (
                        <Button variant="outline" onClick={onClose}>
                          Manage KAP Account
                        </Button>
                      ) : (
                        <CTA
                          size="md"
                          onClick={onClose}
                          label="Set Up Your KAP Account"
                        />
                      )}
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
