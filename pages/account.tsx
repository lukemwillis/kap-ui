import { ChevronDownIcon, StarIcon } from "@chakra-ui/icons";
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
import SearchBox from "../components/SearchBox";
import ProfileForm from "../components/ProfileForm";
import {
  FaCalendarPlus,
  FaEllipsisV,
  FaPaperPlane,
  FaTag,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNameService, NameObject } from "../context/NameServiceProvider";

const Account: NextPage = () => {
  const isMenuIcon = useBreakpointValue({ base: true, md: false });
  const muted = useColorModeValue("gray.600", "gray.400");
  const { getNames } = useNameService();
  const [names, setNames] = useState<NameObject[]>([]);
  useEffect(() => {
    getNames().then((result) => {
      setNames(result?.names || []);
    });
  });

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
              <Th></Th>
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
                      {/* TODO renew */}
                      <MenuItem icon={<FaCalendarPlus />}>Add Years</MenuItem>
                      {/* TODO Profile */}
                      <MenuItem icon={<StarIcon mb="1" />}>
                        Make Primary
                      </MenuItem>
                      {/* TODO transfer */}
                      <MenuItem icon={<FaPaperPlane />}>Transfer</MenuItem>
                      {/* TODO Kollection */}
                      <MenuItem icon={<FaTag />}>List For Sale</MenuItem>
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
