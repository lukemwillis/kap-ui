import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Text,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Airdrop from "../components/icons/Airdrop";
import CTA from "../components/CTA";
import Price from "../components/Price";
import PricingExplainer from "../components/PricingExplainer";
import Shiny from "../components/Shiny";
import { useCart } from "../context/CartProvider";
import Infinite from "../components/icons/Infinite";
import { useNameService } from "../context/NameServiceProvider";
import { useEffect, useState } from "react";

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
  const { getName } = useNameService();
  const [query, setQuery] = useState("");
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    if (typeof q !== "string") return;
    let parsed = (q as string).toLowerCase();
    if (parsed.endsWith(".koin")) {
      parsed = parsed.substring(0, parsed.length - 5);
    }
    if (parsed.length === 0) return;

    if (parsed !== query) {
      setIsLoading.on();

      setQuery(parsed);

      getName!(`${parsed}.koin`).then((result: any) => {
        setName(result);
        setIsLoading.off();
      });
    }
  }, [getName, q, query, setIsLoading]);

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
          {/* TODO get_name */}
          <Skeleton isLoaded={!isLoading}>
            <Text>{name ? "Sorry, unavailable" : "It's available!"}</Text>
          </Skeleton>
          <Heading
            size="3xl"
            overflowWrap="anywhere"
            marginBottom="0.3em"
            wordBreak="break-all"
          >
            <Shiny color={accentColor} size="0.5em">
              <>
                {query}
                <wbr />
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
            This includes your NFT account name, simple account privacy and
            security features, and free access to Koinos dApps.
          </Text>
        </Flex>
        <Flex
          background={background}
          borderRadius="8"
          padding={{ base: "4", md: "8" }}
          width={{ base: "100%", md: "auto" }}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          maxWidth={{ base: "100%", md: "20em" }}
          direction="column"
        >
          {query.length > 10 ? (
            <>
              <Infinite size="8em" color={iconColor} />
              <Heading as="h3" size="md" lineHeight="2">
                Yours, Forever
              </Heading>
              <Text>
                Free KAP account NFTs do not require annual renewal. Mint once,
                use always.
              </Text>
            </>
          ) : (
            <>
              <Airdrop size="8em" color={iconColor} />
              <Heading as="h3" size="md" lineHeight="2">
                $KAP Airdrop Eligible
              </Heading>
              <Text>
                Every dollar you spend on .koin names now will earn you $KAP
                tokens later.
              </Text>
            </>
          )}
        </Flex>
      </Flex>
      <Box
        padding={{ base: "6", md: "12" }}
        border="1px"
        borderColor={background}
        borderRadius="8"
      >
        {query.length > 10 ? (
          <>
            <Heading>Want a premium name?</Heading>
            <Text>
              With KAP, shorter names cost more. This helps minimize squatting
              to ensure you can find the name you want within your budget.
            </Text>
          </>
        ) : (
          <>
            <Heading>Too expensive?</Heading>
            <Text>
              With KAP, longer names cost less. If your name is longer than 10
              characters, it&apos;s completely free forever.
            </Text>
          </>
        )}
        <PricingExplainer initialQuery={query} />
      </Box>
    </Flex>
  );
};

export default Search;
