import type { NextPage } from "next";
import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Head from "next/head";
import { useEffect } from "react";
import { pageView } from "../utils/ga";
import { useAccount } from "../context/AccountProvider";
import Countdown from "react-countdown";

const Home: NextPage = () => {
  const { hasPressBadge } = useAccount();
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
        {parseInt(process.env.NEXT_PUBLIC_LIVE!) <= Date.now() ||
        hasPressBadge ? (
          <SearchBox
            placeholder="Pick your username..."
            buttonLabel="Search Account Name"
          />
        ) : (
          <>
            <Heading fontSize="5xl" fontFamily="mono">
              <Countdown date={parseInt(process.env.NEXT_PUBLIC_LIVE!)} />
            </Heading>
            <Link
              href="https://kap-domains-bucket.s3.us-east-1.amazonaws.com/kap-whitepaper.pdf"
              target="_blank"
              rel="noreferrer"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="solid"
                minWidth="unset"
                width="100%"
                fontWeight="bold"
                background="brand.navy"
                borderColor="brand.navy"
                color="white"
                borderWidth="2px"
                boxSizing="border-box"
                _hover={{
                  background: "transparent",
                  borderWidth: "2px",
                  color: "brand.orange",
                  borderColor: "brand.orange",
                }}
                size="lg"
                rightIcon={<ExternalLinkIcon />}
              >
                Read The Whitepaper
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </>
  );
};

export default Home;
