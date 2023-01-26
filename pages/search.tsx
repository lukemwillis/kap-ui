import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Airdrop from "../components/icons/Airdrop";
import CTA from "../components/CTA";
import Price from "../components/Price";
import PricingExplainer from "../components/PricingExplainer";
import Shiny from "../components/Shiny";
import { useCart } from "../context/CartProvider";

const Search: NextPage = () => {
  const {
    query: { q },
  } = useRouter();
  const background = useColorModeValue("gray.200", "gray.700");
  const foreground = useColorModeValue("gray.600", "gray.400");
  const accentColor = "brand.orange";
  const iconColor = useColorModeValue("brand.navy", "white");
  const {
    state: { items },
    upsertItem,
    onCartOpen,
  } = useCart();

  if (typeof q !== "string") return <>Could not parse query</>;

  let query = q as string;

  if (query.endsWith(".koin")) {
    query = query.substring(0, query.length - 5);
  }

  if (query.length === 0) return <>Query too short</>;

  const isInCart = items && !!items[query];

  return (
    <Flex direction="column" width="100%" gap={{ base: "4", md: "8" }}>
      <Flex
        padding={{ base: "6", md: "12" }}
        border="1px"
        borderColor={background}
        borderRadius="8"
        gap={{ base: "6", md: "12" }}
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <Flex
          flexGrow="1"
          alignItems={{ base: "center", md: "start" }}
          direction="column"
          textAlign={{ base: "center", md: "left" }}
        >
          <Text>It&apos;s available!</Text>
          <Heading
            size="3xl"
            overflowWrap="anywhere"
            marginBottom="0.3em"
            wordBreak="break-all"
          >
            <Shiny color={accentColor} size="0.5em">
              <>
                {query}
                <Text
                  as="span"
                  color={foreground}
                  marginStart="0"
                  display="inline"
                  wordBreak="keep-all"
                >
                  .koin
                </Text>
              </>
            </Shiny>
          </Heading>
          <CTA
            size="lg"
            onClick={() => {
              if (!isInCart) upsertItem({ name: query, years: 1 });
              onCartOpen();
            }}
            label={isInCart ? "Go to cart" : "Claim your name"}
            secondary={isInCart}
          />
          <Box marginTop="0.5em" marginBottom="1em">
            <Price query={query} />
          </Box>
          <Text>
            This price includes your NFT account name, simple account privacy
            and security features, and free access to the Koinos blockchain.
          </Text>
        </Flex>
        <Box
          background={background}
          borderRadius="8"
          padding={{ base: "4", md: "8" }}
          width={{ base: "100%", md: "auto" }}
          textAlign="center"
          maxWidth={{ base: "100%", md: "20em" }}
        >
          <Airdrop size="8em" color={iconColor} />
          <Heading as="h3" size="md" lineHeight="2">
            $KAP Airdrop Eligible
          </Heading>
          <Text>
            Every dollar you spend on .koin names now will earn you $KAP tokens
            later.
          </Text>
        </Box>
      </Flex>
      <Box
        padding={{ base: "6", md: "12" }}
        border="1px"
        borderColor={background}
        borderRadius="8"
      >
        <Heading>Too expensive?</Heading>
        <Text>
          With KAP, longer names cost less. If your name is longer than 10
          characters, it&apos;s completely free. Forever.
        </Text>
        <PricingExplainer initialQuery={query} />
      </Box>
    </Flex>
  );
};

export default Search;
