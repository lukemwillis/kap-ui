import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
  useBoolean,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Airdrop from "../components/icons/Airdrop";
import CTA from "../components/CTA";
import Price from "../components/Price";
import PricingExplainer from "../components/PricingExplainer";
import Shiny from "../components/Shiny";
import { calculatePrice, useCart } from "../context/CartProvider";
import Infinite from "../components/icons/Infinite";
import { NameObject, useNameService } from "../context/NameServiceProvider";
import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import { NotAllowedIcon } from "@chakra-ui/icons";
import Profile from "../components/Profile";
import Head from "next/head";

const Search: NextPage = () => {
  const {
    query: { q },
    replace,
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
  const [name, setName] = useState<NameObject>();
  const [ready, setReady] = useBoolean(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (ready) {
      window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "", {
        page_path: window.location.pathname,
      });

      const price = !name ? calculatePrice(query.length, 1) : 0;
      window.gtag("event", "view_item", {
        currency: "USD",
        value: price,
        items: {
          item_name: `${query}.koin`,
          price: price,
          quantity: 1,
        },
      });
    }
  }, [ready]);

  useEffect(() => {
    if (typeof q !== "string") {
      return;
    }

    let parsed = (q as string).toLowerCase();
    if (parsed.endsWith(".koin")) {
      parsed = parsed.substring(0, parsed.length - 5);
    }
    if (parsed.length === 0) {
      replace("/");
      return;
    }

    if (parsed !== query) {
      setQuery(parsed);

      window.gtag("event", "search", {
        search_term: parsed,
      });

      // TODO use domain
      getName!(`${parsed}.koin`).then((result) => {
        setName(result);
        setReady.on();
      });
    }
  }, [getName, q, query, setReady, replace]);

  const isInCart = items && !!items[query];

  if (!ready) {
    return (
      <>
        <Head>
          <title>Searching... | KAP</title>
        </Head>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="center"
          direction="column"
          gap="8"
        >
          <Spinner size="xl" />
        </Flex>
      </>
    );
  }

  // available
  if (!name) {
    return (
      <>
        <Head>
          <title>{query}.koin is available! | KAP</title>
        </Head>
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
              {query.length <= 10 ||
              process.env.NEXT_PUBLIC_FREE_LAUNCHED === "true" ? (
                <>
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
                        <wbr />
                        <Text
                          as="span"
                          color={foreground}
                          marginStart="0"
                          display="inline"
                          wordBreak="keep-all"
                        >
                          {/* TODO use domain */}
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
                    This includes your NFT account name, simple account privacy
                    and security features, and free access to Koinos dApps.
                  </Text>
                </>
              ) : (
                <>
                  <Heading
                    size="3xl"
                    overflowWrap="anywhere"
                    marginBottom="0.3em"
                    wordBreak="break-all"
                  >
                    {query}
                    <wbr />
                    <Text
                      as="span"
                      color={foreground}
                      marginStart="0"
                      display="inline"
                      wordBreak="keep-all"
                    >
                      {/* TODO use domain */}
                      .koin
                    </Text>
                  </Heading>
                  <CTA
                    size="lg"
                    onClick={() => {}}
                    label="Coming soon"
                    secondary
                    disabled
                  />
                  <Box marginTop="0.5em" marginBottom="1em">
                    <Price query={query} />
                  </Box>
                  <Text>
                    Free names will launch later this year. If you&apos;d like
                    to start using KAP now, please select a shorter name.
                  </Text>
                </>
              )}
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
                    Free KAP account NFTs do not require annual renewal. Mint
                    once, use always.
                  </Text>
                </>
              ) : (
                <>
                  <Airdrop size="8em" color={iconColor} />
                  <Heading as="h3" size="md" lineHeight="2">
                    $KAP Airdrop Eligible
                  </Heading>
                  <Text>
                    Buying .koin names now will earn you $KAP tokens later.
                    Details to be announced.
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
                  With KAP, shorter names cost more. This helps minimize
                  squatting to ensure you can find the name you want within your
                  budget.
                </Text>
              </>
            ) : (
              <>
                <Heading>Too expensive?</Heading>
                <Text>
                  With KAP, longer names cost less. If your name is longer than
                  10 characters, it&apos;s completely free forever.
                </Text>
              </>
            )}
            <PricingExplainer initialQuery={query} />
          </Box>
        </Flex>
      </>
    );
    // unavailable
  } else {
    return (
      <>
        <Head>
          <title>{query}.koin is unavailable | KAP</title>
        </Head>
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
              <Badge
                variant="solid"
                colorScheme="gray"
                fontSize="lg"
                marginBottom="2"
              >
                Name Taken
              </Badge>
              <Heading
                size="2xl"
                overflowWrap="anywhere"
                marginBottom="0.3em"
                wordBreak="break-all"
                mb="0"
              >
                <NotAllowedIcon color={background} mb="1" /> {query}
                <wbr />
                <Text
                  as="span"
                  color={foreground}
                  marginStart="0"
                  display="inline"
                  wordBreak="keep-all"
                >
                  .{name.domain}
                </Text>
              </Heading>
              <Text mb="3">
                Expires{" "}
                {new Date(parseInt(name.expiration)).toLocaleDateString(
                  undefined,
                  { day: "numeric", month: "long", year: "numeric" }
                )}
              </Text>
              <Button
                as={Link}
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_KOLLECTION_URL}/${process.env.NEXT_PUBLIC_NAME_SERVICE_ADDR}/${name.name}.${name.domain}`}
              >
                View on Kollection
              </Button>
            </Flex>
          </Flex>
          <Flex gap="4" justifyContent="center">
            <SearchBox
              placeholder="Find a new username..."
              buttonLabel="Search"
              inlineButton={isMobile}
              autoFocus
            />
          </Flex>
          <Profile name={`${name.name}.${name.domain}`} />
        </Flex>
      </>
    );
  }
};

export default Search;
