import type { NextPage } from "next";
import { Flex, Heading } from "@chakra-ui/react";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";

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
      {process.env.NEXT_PUBLIC_IS_LIVE === "true" ? (
        <SearchBox
          placeholder="Pick your username..."
          buttonLabel="Search Account Name"
        />
      ) : (
        <Heading>Coming Soon</Heading>
      )}
    </Flex>
  );
};

export default Home;
