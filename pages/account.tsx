import { ChevronDownIcon, StarIcon } from "@chakra-ui/icons";
import {
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
  FaTag,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNameService, NameObject } from "../context/NameServiceProvider";
import CTA from "../components/CTA";
import { calculatePrice } from "../context/CartProvider";
import { useRouter } from "next/router";
import { useAccount } from "../context/AccountProvider";

const Account: NextPage = () => {
  const { push } = useRouter();
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedName, selectName] = useState("");
  const [selectedExpiry, selectExpiry] = useState("");
  const [action, setAction] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [renewYears, setRenewYears] = useState(0);

  const isMenuIcon = useBreakpointValue({ base: true, md: false });
  const muted = useColorModeValue("gray.600", "gray.400");
  const { getNames, renew, isRenewing, transfer, isTransferring } =
    useNameService();
  const [names, setNames] = useState<NameObject[]>([]);
  useEffect(() => {
    if (address) {
      getNames().then((result) => {
        if (result?.names && result.names.length > 0) {
          setNames(result.names);
        } else {
          push("/");
        }
      });
    }
  }, [address, getNames, push]);

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

  return (
    <Flex direction="column" width="100%" gap={{ base: "4", md: "8" }}>
      <ProfileForm names={names} />
      <Flex gap="4" justifyContent="center">
        <SearchBox
          placeholder="Find a new username..."
          buttonLabel="Search"
          inlineButton={useBreakpointValue({ base: true, md: false })}
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
            {names.map(({ name, domain, expiration }) => (
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
                </Td>
                <Td paddingInline={{ base: "4", md: "6" }}>
                  <Menu placement="bottom-end">
                    {isMenuIcon ? (
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
                        href={`${process.env.NEXT_PUBLIC_KOLLECTION_URL}/${process.env.NEXT_PUBLIC_NAME_SERVICE_ADDR}/${name}.${domain}/sell`}
                        target="_blank"
                      >
                        List For Sale
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
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

      <Modal isOpen={isOpen} onClose={onClose}>
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
                  {calculatePrice(selectedName.length - 5, renewYears) || 0}.
                  The new expiration date for {selectedName} will be{" "}
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
                  {selectedName}. Be sure to double check the address. This can
                  not be undone.
                </Text>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <CTA
              label={action === "renew" ? "Add Years" : "Transfer"}
              size="lg"
              disabled={action === "renew" ? renewYears < 1 : !transferAddress}
              onClick={async () => {
                if (action === "renew") {
                  await renew(selectedName, renewYears);
                  setRenewYears(0);
                } else {
                  await transfer(selectedName, transferAddress);
                  setTransferAddress("");
                }
                onClose();
                const updatedNames = await getNames();
                setNames(updatedNames?.names || []);
              }}
              loading={action === "renew" ? isRenewing : isTransferring}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Account;
