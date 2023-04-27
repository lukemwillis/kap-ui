import { ChevronDownIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { utils } from "koilib";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import SearchBox from "../components/SearchBox";
import ProfileForm from "../components/ProfileForm";
import {
  FaCalendarPlus,
  FaEllipsisV,
  FaExternalLinkAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNameService } from "../context/NameServiceProvider";
import CTA from "../components/CTA";
import { calculatePrice } from "../context/CartProvider";
import { useAccount } from "../context/AccountProvider";
import Head from "next/head";
import { pageView } from "../utils/ga";

const Account: NextPage = () => {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedName, selectName] = useState("");
  const [selectedExpiry, selectExpiry] = useState("");
  const [action, setAction] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [renewYears, setRenewYears] = useState(0);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const muted = useColorModeValue("gray.600", "gray.400");
  const { names, fetchNames, renew, isRenewing, transfer, isTransferring } =
    useNameService();

  const openRenew = (name: string, expiry: string) => {
    setAction("renew");
    selectName(name);
    selectExpiry(expiry);
    onOpen();
  };

  const openTransfer = (name: string) => {
    setAction("transfer");
    selectName(name);
    onOpen();
  };

  useEffect(() => {
    pageView();
  });

  if (!address) {
    return (
      <>
        <Head>
          <title>Connect Wallet | KAP</title>
        </Head>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="center"
          direction="column"
          gap="8"
        >
          <Text>Connect your wallet to manage your account</Text>
        </Flex>
      </>
    );
  }

  if (names.length === 0) {
    return (
      <>
        <Head>
          <title>Find A Username | KAP</title>
        </Head>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="center"
          direction="column"
          gap="8"
        >
          <Text>You need a username to set up your profile</Text>
          <SearchBox
            placeholder="Find a username..."
            buttonLabel="Search"
            inlineButton={isMobile}
            autoFocus
          />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Manage Account | KAP</title>
      </Head>
      <Flex direction="column" width="100%" gap={{ base: "4", md: "8" }}>
        <ProfileForm names={names} />
        <Flex gap="4" justifyContent="center">
          <SearchBox
            placeholder="Find a new username..."
            buttonLabel="Search"
            inlineButton={isMobile}
            autoFocus={false}
            secondaryCTA
          />
        </Flex>
        <Card variant="outline">
          <CardHeader>
            <Heading fontSize="2xl">Your Names</Heading>
          </CardHeader>
          <Table width="100%">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Expiration</Th>
                <Th width="0"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {names
                .sort((a, b) => {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  if (a.domain < b.domain) return -1;
                  if (a.domain > b.domain) return 1;
                  return 0;
                })
                .map(({ name, domain, expiration, grace_period_end }) => {
                  const buffer = new TextEncoder().encode(`${name}.${domain}`);
                  const token_id = "0x" + utils.toHexString(buffer);
                  return (
                    <Tr key={`${name}.${domain}`}>
                      <Td>
                        <Text fontSize="xl" wordBreak="break-all">
                          {name}
                          <wbr />
                          <Text as="span" color={muted} wordBreak="keep-all">
                            .{domain}
                          </Text>
                        </Text>
                      </Td>
                      <Td whiteSpace={{ base: "normal", md: "nowrap" }}>
                        <Text color={muted}>
                          {new Date(parseInt(expiration)).toLocaleDateString(
                            undefined,
                            { day: "numeric", month: "long", year: "numeric" }
                          )}
                        </Text>
                        {parseInt(expiration) - Date.now() <
                          1000 * 60 * 60 * 24 * 30 && (
                          <Tooltip
                            hasArrow
                            label={`You have until ${new Date(
                              parseInt(grace_period_end)
                            ).toLocaleDateString(undefined, {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })} to renew this name.`}
                          >
                            {parseInt(expiration) < Date.now() ? (
                              <Badge colorScheme="red">
                                <WarningTwoIcon /> Expired
                              </Badge>
                            ) : (
                              <Badge colorScheme="yellow">
                                <WarningTwoIcon /> Expiring Soon
                              </Badge>
                            )}
                          </Tooltip>
                        )}
                      </Td>
                      <Td paddingInline={{ base: "4", md: "6" }}>
                        <Menu placement="bottom-end">
                          {isMobile ? (
                            <MenuButton
                              as={IconButton}
                              icon={<FaEllipsisV />}
                              aria-label="Manage"
                              variant="ghost"
                            />
                          ) : (
                            <MenuButton
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                              variant="outline"
                            >
                              Manage
                            </MenuButton>
                          )}
                          <MenuList fontSize="lg">
                            <MenuItem
                              icon={<FaCalendarPlus />}
                              onClick={() =>
                                openRenew(`${name}.${domain}`, expiration)
                              }
                            >
                              Add Years
                            </MenuItem>
                            <MenuItem
                              icon={<FaPaperPlane />}
                              onClick={() => openTransfer(`${name}.${domain}`)}
                            >
                              Transfer
                            </MenuItem>
                            <MenuItem
                              icon={<FaExternalLinkAlt />}
                              as="a"
                              href={`${process.env.NEXT_PUBLIC_KOLLECTION_URL}/${process.env.NEXT_PUBLIC_NAME_SERVICE_ADDR}/${token_id}/sell`}
                              target="_blank"
                            >
                              List For Sale
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Name</Th>
                <Th>Expiration</Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </Card>

        <Modal
          isOpen={isOpen}
          onClose={() => {
            setRenewYears(0);
            setTransferAddress("");
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {action === "renew" ? "Add years for" : "Transfer"} {selectedName}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {action === "renew" ? (
                <>
                  <Text>Number of years:</Text>
                  <NumberInput
                    value={renewYears}
                    onChange={(_, years) => setRenewYears(years)}
                    min={0}
                    max={
                      10 -
                      Math.ceil(
                        (parseInt(selectedExpiry) - Date.now()) /
                          (86_400_000 * 365)
                      )
                    }
                    mb="3"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text>
                    Total years cannot exceed 10. You will be charged $
                    {calculatePrice(
                      selectedName.substring(0, selectedName.length - 5),
                      renewYears
                    ) || 0}
                    . The new expiration date for {selectedName} will be{" "}
                    {new Date(
                      parseInt(selectedExpiry) +
                        86_400_000 * 365 * (renewYears || 0)
                    ).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                </>
              ) : (
                <>
                  <Input
                    placeholder="Address to transfer to..."
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                    mb="3"
                  />
                  <Text>
                    After this transfer, you will no longer be the owner of{" "}
                    {selectedName}. Be sure to double check the address. This
                    can not be undone.
                  </Text>
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <CTA
                label={action === "renew" ? "Add Years" : "Transfer"}
                size="lg"
                disabled={
                  action === "renew" ? renewYears < 1 : !transferAddress
                }
                onClick={async () => {
                  if (action === "renew") {
                    await renew(selectedName, renewYears);
                    setRenewYears(0);
                  } else {
                    await transfer(selectedName, transferAddress);
                    setTransferAddress("");
                  }
                  onClose();
                  fetchNames();
                }}
                loading={action === "renew" ? isRenewing : isTransferring}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default Account;
