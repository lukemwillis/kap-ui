import type { NextPage } from "next";
import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Head from "next/head";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "", {
      page_path: window.location.pathname,
    });
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
        {process.env.NEXT_PUBLIC_IS_LIVE === "true" ? (
          <SearchBox
            placeholder="Pick your username..."
            buttonLabel="Search Account Name"
          />
        ) : (
          <>
            <Heading>Coming Q2 2023</Heading>
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
