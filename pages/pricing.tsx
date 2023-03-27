import { CheckCircleIcon, StarIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Price from "../components/Price";
import PricingExplainer from "../components/PricingExplainer";
import Shiny from "../components/Shiny";

const Pricing: NextPage = () => {
  useEffect(() => {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "", {
      page_path: window.location.pathname,
    });
  });

  return (
    <>
      <Head>
        <title>Pricing | KAP</title>
      </Head>
      <Flex direction="column" width="100%" gap={{ base: "4", md: "8" }}>
        <Box
          padding={{ base: "6", md: "12" }}
          borderRadius="8"
          background="brand.orange"
          color="white"
        >
          <Flex flexWrap="wrap" gap="4" mb="4">
            <Box flexBasis={{ base: "100%", md: "2" }} flexGrow="2">
              <Heading>
                <Shiny size="0.5em" color="white">
                  Premium Account NFTs
                </Shiny>
              </Heading>
              <Text>
                Short account names with serious benefits. Whatver your budget,
                find the username you really want. No compromising required.
              </Text>
            </Box>
            <Box flexBasis="1" flexGrow="1">
              <List spacing="2">
                <ListItem>
                  <ListIcon as={CheckCircleIcon} mb="1" />
                  1-10 Character Name NFT
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} mb="1" />
                  Advanced Security Tools
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} mb="1" />
                  Free dApp Access
                </ListItem>
              </List>
            </Box>
          </Flex>
          <Flex width="100%" gap={{ base: "4", md: "8" }} flexWrap="wrap">
            <Box
              padding={{ base: "4", md: "8" }}
              borderRadius="8"
              flex="1"
              background="white"
              color="gray.800"
              textAlign="center"
            >
              <Box color="brand.orange">
                <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
              </Box>
              <Text>1 Character</Text>
              <Price query="x" />
            </Box>
            <Box
              padding={{ base: "4", md: "8" }}
              borderRadius="8"
              flex="1"
              background="white"
              color="gray.800"
              textAlign="center"
            >
              <Box color="brand.orange">
                <StarIcon /> <StarIcon /> <StarIcon />
              </Box>
              <Text>2-3 Characters</Text>
              <Price query="kui" />
            </Box>
            <Box
              padding={{ base: "4", md: "8" }}
              borderRadius="8"
              flex="1"
              background="white"
              color="gray.800"
              textAlign="center"
            >
              <Box color="brand.orange">
                <StarIcon /> <StarIcon />
              </Box>
              <Text>4-6 Characters</Text>
              <Price query="luke" />
            </Box>
            <Box
              padding={{ base: "4", md: "8" }}
              borderRadius="8"
              flex="1"
              background="white"
              color="gray.800"
              textAlign="center"
            >
              <Box color="brand.orange">
                <StarIcon />
              </Box>
              <Text>7-10 Characters</Text>
              <Price query="lukewillis" />
            </Box>
          </Flex>
        </Box>
        <Box
          padding={{ base: "6", md: "12" }}
          borderRadius="8"
          background="brand.navy"
          color="white"
        >
          <Flex flexWrap="wrap" gap="4">
            <Box flexBasis={{ base: "100%", md: "2" }} flexGrow="2">
              <Heading>
                FREE Account NFTs{" "}
                <Badge fontSize="0.6em">
                  {process.env.NEXT_PUBLIC_FREE_LAUNCHED === "true"
                    ? "MOST POPULAR"
                    : "COMING Q4 2023"}
                </Badge>
              </Heading>
              <Text>
                No cost to mint. No gas fees. Register your name once and own it
                forever. No trial periods, just plain free.
              </Text>
            </Box>
            <Box flexBasis="1" flexGrow="1">
              <List spacing="2">
                <ListItem>
                  <ListIcon as={CheckCircleIcon} mb="1" />
                  11+ Character Name NFT
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} mb="1" />
                  Basic Security Tools
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} mb="1" />
                  Limited Free dApp Access
                </ListItem>
              </List>
            </Box>
          </Flex>
        </Box>
        <Box
          padding={{ base: "6", md: "12" }}
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderRadius="8"
        >
          <Heading>Ready to pick your username?</Heading>
          <PricingExplainer initialQuery="example" />
        </Box>
      </Flex>
    </>
  );
};

export default Pricing;
