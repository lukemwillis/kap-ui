import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";
import Head from "next/head";
import { useEffect } from "react";
import { pageView } from "../utils/ga";

const Home: NextPage = () => {
  useEffect(() => {
    pageView();
  });

  return (
    <>
      <Head>
        <title>KAP</title>
      </Head>
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        gap="8"
      >
        <Logo size={{ base: "80px", md: "128px" }} />
        <SearchBox
          placeholder="Pick your username..."
          buttonLabel="Search Account Name"
        />
      </Flex>
    </>
  );
};

export default Home;
