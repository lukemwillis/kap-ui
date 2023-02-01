import {
  ChevronDownIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
} from "@chakra-ui/react";
import { NextPage } from "next";
import AddYears from "../components/icons/AddYears";
import Sell from "../components/icons/Sell";
import Send from "../components/icons/Send";
import SearchBox from "../components/SearchBox";
import ProfileForm from "../components/ProfileForm";
import { FaEllipsisV } from "react-icons/fa";

const names = [
  "luke",
  "kui",
  "areallyreallyreallyreallyreallyreallylongnamejusttoseewhathappens",
  "123",
  "a",
  "andrarchy",
  "vandeberg",
  "steve",
];

const Account: NextPage = () => {
  const isMenuIcon = useBreakpointValue({ base: true, md: false });
  const muted = useColorModeValue("gray.600", "gray.400");
  return (
    <Flex direction="column" width="100%" gap={{ base: "4", md: "8" }}>
      <ProfileForm />
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
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {names.map((name) => (
              <Tr key={name}>
                <Td>
                  <Text fontSize="xl" wordBreak="break-all">
                    {name}
                    <wbr />
                    <Text as="span" color={muted} wordBreak="keep-all">
                      .koin
                    </Text>
                  </Text>
                </Td>
                <Td whiteSpace={{ base: "normal", md: "nowrap" }}>
                  <Text color={muted}>Aug 2, 2024</Text>
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
                      <MenuItem icon={<AddYears size="1em" color="inherit" />}>
                        Add Years
                      </MenuItem>
                      <MenuItem icon={<StarIcon mb="1" />}>
                        Make Primary
                      </MenuItem>
                      <MenuItem icon={<Send size="1em" color="inherit" />}>
                        Transfer
                      </MenuItem>
                      <MenuItem icon={<Sell size="1em" color="inherit" />}>
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
    </Flex>
  );
};

export default Account;
