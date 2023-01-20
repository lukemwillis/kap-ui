import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Search from "../components/Search";

const Home: NextPage = () => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="8"
    >
      <Logo size={{ base: "80px", md: "128px" }} />
      <Search placeholder="Pick your username..." buttonLabel="Search Account Name" />
    </Flex>
  );
};

export default Home;
