import { ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Link,
  Text,
  useColorModeValue,
  ListIcon,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Free from "../components/icons/Free";
import Name from "../components/icons/Name";
import Security from "../components/icons/Security";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About | KAP</title>
      </Head>
      <Flex direction="column" width="100%" gap={{ base: "4", md: "8" }}>
        <Flex
          justifyContent="space-between"
          gap="4"
          flexWrap="wrap"
          alignItems="center"
          width="100%"
        >
          <Heading as="h1">Koinos Account Protocol</Heading>
          <Link
            href="https://kap-domains-bucket.s3.us-east-1.amazonaws.com/kap-whitepaper.pdf"
            target="_blank"
            rel="noreferrer"
            width={{ base: "100%", sm: "auto" }}
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
        </Flex>
        <Text fontSize={{ base: "md", md: "xl" }}>
          KAP makes it easy to access dApps without buying tokens. You just get
          a free or premium username and go. Built on the Koinos blockchain, KAP
          is the backbone of social, gaming, and any other free-to-use dApp. KAP
          is launching in Q2 2023 with premium account names. It will evolve to
          include a host of features that make it easy to experience blockchain
          for free.
        </Text>
        <Flex textAlign="center" gap={{ base: "4", md: "8" }} flexWrap="wrap">
          <Box
            padding={{ base: "6", md: "12" }}
            borderRadius="8"
            background="brand.orange"
            color="white"
            flex="1"
          >
            <Name color="white" size="4em" />
            <Heading size="lg">NFT Name Service</Heading>
          </Box>
          <Box
            padding={{ base: "6", md: "12" }}
            borderRadius="8"
            background="brand.orange"
            color="white"
            flex="1"
          >
            <Security color="white" size="4em" />
            <Heading size="lg">Account Security</Heading>
          </Box>
          <Box
            padding={{ base: "6", md: "12" }}
            borderRadius="8"
            background="brand.orange"
            color="white"
            flex="1"
          >
            <Free color="white" size="4em" />
            <Heading size="lg">Free dApp Access</Heading>
          </Box>
        </Flex>

        <Box
          padding={{ base: "6", md: "12" }}
          borderRadius="8"
          background="brand.navy"
          color="white"
        >
          <Heading>Roadmap</Heading>
          <Box marginTop="0.5em" marginLeft="0.5em">
            <Box
              borderLeft="2px"
              paddingLeft="2em"
              paddingBottom="1em"
              _before={{
                content: '""',
                width: "1.5em",
                height: "1.5em",
                borderRadius: "50%",
                background: "brand.orange",
                borderColor: "white",
                borderWidth: "2px",
                position: "absolute",
                marginLeft: "calc(-2.75em - 1px)",
              }}
            >
              <Text fontWeight="bold">Q2 2023</Text>
              <Heading as="h3" size="lg">
                Genesis
              </Heading>
              <List>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Launch KAP premium named accounts for $KOIN holders
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Support customizable KAP social profiles with NFT avatars
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Whitelist NFT purchasers for $KAP airdrop
                </ListItem>
              </List>
            </Box>
            <Box
              borderLeft="2px"
              paddingLeft="2em"
              paddingBottom="1em"
              _before={{
                content: '""',
                width: "1.5em",
                height: "1.5em",
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                marginLeft: "calc(-2.75em - 1px)",
              }}
            >
              <Text fontWeight="bold">Q3 2023</Text>
              <Heading as="h3" size="lg">
                Integration
              </Heading>
              <List>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Integrate with Kollection NFT Marketplace
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Integrate profiles with existing wallets and block explorers
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Create integration tools for dApps
                </ListItem>
              </List>
            </Box>
            <Box
              borderLeft="2px"
              paddingLeft="2em"
              paddingBottom="1em"
              _before={{
                content: '""',
                width: "1.5em",
                height: "1.5em",
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                marginLeft: "calc(-2.75em - 1px)",
              }}
            >
              <Text fontWeight="bold">Q3 2023</Text>
              <Heading as="h3" size="lg">
                Tokenless Access
              </Heading>
              <List>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Launch Mana Station to provide free dApp access
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Prepare protocol for free account launch
                </ListItem>
              </List>
            </Box>
            <Box
              borderLeft="2px"
              paddingLeft="2em"
              paddingBottom="1em"
              _before={{
                content: '""',
                width: "1.5em",
                height: "1.5em",
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                marginLeft: "calc(-2.75em - 1px)",
              }}
            >
              <Text fontWeight="bold">Q4 2023</Text>
              <Heading as="h3" size="lg">
                Web2 Parity
              </Heading>
              <List>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Open free account registration
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Launch account abstraction features
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Launch credit card support for premium name purchases
                </ListItem>
              </List>
            </Box>
            <Box
              borderLeft="2px"
              paddingLeft="2em"
              paddingBottom="1em"
              _before={{
                content: '""',
                width: "1.5em",
                height: "1.5em",
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                marginLeft: "calc(-2.75em - 1px)",
              }}
            >
              <Text fontWeight="bold">2024</Text>
              <Heading as="h3" size="lg">
                KAP DAO
              </Heading>
              <List>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  $KAP airdrop to premium account holders
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Open permissionless TLA registration
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Fully decentralize protocol
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} mb="1" />
                  Enable public $KOIN deposits to generate yield with Mana
                  Station
                </ListItem>
              </List>
            </Box>
            <Box
              width="0"
              height="0"
              borderX="0.5em solid transparent"
              borderTop="1em solid white"
              position="absolute"
              marginLeft="calc(-0.5em + 1px)"
            />
          </Box>
        </Box>

        <Box
          padding={{ base: "6", md: "12" }}
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderRadius="8"
        >
          <Heading mb="0.5em">FAQ</Heading>

          <Accordion>
            <AccordionItem borderWidth="0">
              <AccordionButton paddingStart="0" paddingEnd="0">
                <Box flex="1" textAlign="left">
                  <Heading as="h3" size="lg">
                    What is a premium KAP account?
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                Each KAP account name is unique but shorter names are more
                desirable and thus considered &quot;premium.&quot; Premium names
                have 10 or fewer characters and will be priced based on
                character count.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderWidth="0">
              <AccordionButton paddingStart="0" paddingEnd="0">
                <Box flex="1" textAlign="left">
                  <Heading as="h3" size="lg">
                    Who can get a KAP account?
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                Anyone can own a KAP account. We&apos;ll start by offering
                premium KAP accounts which will be purchaseable with $KOIN.
                Later in the year, we&apos;ll release the free tier of KAP
                accounts, meaning you won&apos;t need any cryptocurrency to get
                a KAP account or even to use the blockchain!
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderWidth="0">
              <AccordionButton paddingStart="0" paddingEnd="0">
                <Box flex="1" textAlign="left">
                  <Heading as="h3" size="lg">
                    Why would I want to &quot;own&quot; my name?
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                For the same reason you would want a good email address or
                username. Your KAP name will be portable across dApps built on
                Koinos. When you purchase a name, KAP will mint an NFT with your
                chosen username and issue it to your wallet address. By owning
                the NFT, you own your name. No one can take it away from you, so
                you can use it with confidence online.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderWidth="0" _last={{ borderWidth: 0 }}>
              <AccordionButton paddingStart="0" paddingEnd="0">
                <Box flex="1" textAlign="left">
                  <Heading as="h3" size="lg">
                    Why would I want to own more than one name?
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                You may want to use multiple identities depending on which
                community you&apos;re interacting with. You can keep your
                identities in different wallets or switch out your preferred
                name whenever you want. Some people may choose to speculate on
                the future value of KAP names, but Top Level Accounts, Inc.
                makes no guarantees on their speculative value.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Flex>
    </>
  );
};

export default About;
