import { ExternalLinkIcon } from "@chakra-ui/icons";
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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import Free from "../components/icons/Free";
import Name from "../components/icons/Name";
import Security from "../components/icons/Security";

const About: NextPage = () => {
  return (
    <Flex direction="column" width="100%" gap={{ base: "4", md: "8" }}>
      <Box
        padding={{ base: "6", md: "12" }}
        borderRadius="8"
        background="brand.navy"
        color="white"
      >
        <Flex
          justifyContent="space-between"
          gap={{ base: "4", md: "8" }}
          marginBottom={{ base: "4", md: "8" }}
          flexWrap="wrap"
          alignItems="center"
        >
          <Heading as="h1">Koinos Account Protocol</Heading>
          <a
            href="https://kap-domains-bucket.s3.us-east-1.amazonaws.com/kap-whitepaper.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="solid"
              minWidth="unset"
              fontWeight="bold"
              background="brand.orange"
              borderColor="brand.orange"
              color="white"
              borderWidth="2px"
              boxSizing="border-box"
              _hover={{
                background: "transparent",
                borderWidth: "2px",
                color: "white",
                borderColor: "white",
              }}
              size="lg"
              rightIcon={<ExternalLinkIcon />}
            >
              Read The Whitepaper
            </Button>
          </a>
        </Flex>
        <Flex textAlign="center" gap={{ base: "4", md: "8" }} flexWrap="wrap">
          <Box
            padding={{ base: "6", md: "12" }}
            borderRadius="8"
            background="white"
            color="black"
            flex="1"
          >
            <Name color="black" size="4em" />
            <Heading size="lg">NFT Name Service</Heading>
          </Box>
          <Box
            padding={{ base: "6", md: "12" }}
            borderRadius="8"
            background="white"
            color="black"
            flex="1"
          >
            <Security color="black" size="4em" />
            <Heading size="lg">Account Security</Heading>
          </Box>
          <Box
            padding={{ base: "6", md: "12" }}
            borderRadius="8"
            background="white"
            color="black"
            flex="1"
          >
            <Free color="black" size="4em" />
            <Heading size="lg">Free dApp Access</Heading>
          </Box>
        </Flex>
      </Box>

      <Box
        padding={{ base: "6", md: "12" }}
        borderRadius="8"
        background="brand.orange"
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
              width: "1em",
              height: "1em",
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              marginLeft: "calc(-2.5em - 1px)",
            }}
          >
            <Text>Q2 2023</Text>
            <Heading as="h3" size="lg">
              Genesis
            </Heading>
            <List>
              <ListItem>Launch KAP premium named accounts</ListItem>
              <ListItem>Requires $KOIN to purchase</ListItem>
              <ListItem>All purchasers qualify for $KAP airdrop</ListItem>
            </List>
          </Box>
          <Box
            borderLeft="2px"
            paddingLeft="2em"
            paddingBottom="1em"
            _before={{
              content: '""',
              width: "1em",
              height: "1em",
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              marginLeft: "calc(-2.5em - 1px)",
            }}
          >
            <Text>Q3 2023</Text>
            <Heading as="h3" size="lg">
              Integration
            </Heading>
            <List>
              <ListItem>
                Integrate with existing wallets and block explorers
              </ListItem>
              <ListItem>Create integration tools for dApps</ListItem>
              <ListItem>Set up KAP profiles with NFT avatars</ListItem>
            </List>
          </Box>
          <Box
            borderLeft="2px"
            paddingLeft="2em"
            paddingBottom="1em"
            _before={{
              content: '""',
              width: "1em",
              height: "1em",
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              marginLeft: "calc(-2.5em - 1px)",
            }}
          >
            <Text>Q3 2023</Text>
            <Heading as="h3" size="lg">
              Tokenless Access
            </Heading>
            <List>
              <ListItem>
                Launch Mana Station to provide free dApp access
              </ListItem>
              <ListItem>Prepare protocol for free account launch</ListItem>
            </List>
          </Box>
          <Box
            borderLeft="2px"
            paddingLeft="2em"
            paddingBottom="1em"
            _before={{
              content: '""',
              width: "1em",
              height: "1em",
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              marginLeft: "calc(-2.5em - 1px)",
            }}
          >
            <Text>Q4 2023</Text>
            <Heading as="h3" size="lg">
              One-Step Access
            </Heading>
            <List>
              <ListItem>Open free account registration</ListItem>
              <ListItem>Launch account abstraction features</ListItem>
              <ListItem>Launch credit card support for premium names</ListItem>
            </List>
          </Box>
          <Box
            paddingLeft="calc(2em + 2px)"
            paddingBottom="1em"
            _before={{
              content: '""',
              width: "1em",
              height: "1em",
              borderRadius: "50%",
              background: "white",
              position: "absolute",
              marginLeft: "calc(-2.5em - 1px)",
            }}
          >
          <Text>2024</Text>
          <Heading as="h3" size="lg">
            KAP DAO
          </Heading>
          <List>
            <ListItem>$KAP airdrop to premium account holders</ListItem>
            <ListItem>Fully decentralize protocol</ListItem>
            <ListItem>Enable public $KOIN deposits to generate yield with Mana Station</ListItem>
          </List>
          </Box>
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
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3">What is KAP?</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Koinos Account Protocol simplifies how you access dApps built on
              the Koinos blockchain. KAP is the easiest way to customize your
              blockchain experience for free. Pick a username and start using
              blockchain right away! KAP will launch in early 2023 with premium
              account options. It will evolve to include a host of features such
              as Mana sharing, account recovery and more, all in one place.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3">What is a premium KAP account?</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Each KAP account name is unique but an account name with fewer
              characters is likely to be highly desirable and thus considered
              &quot;premium.&quot; Premium names have 10 or fewer characters and
              will be priced based on character count only. See{" "}
              <Link href="/pricing">
                <a style={{ textDecoration: "underline" }}>the pricing page</a>
              </Link>{" "}
              for details.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3">Who can get a KAP account?</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Anyone can own a KAP account. We&apos;ll start by offering premium
              KAP accounts which will require users to own some $KOIN. A few
              months later, we&apos;ll release the free tier of KAP accounts,
              meaning you won&apos;t need any cryptocurrency to get a KAP
              account, or even use blockchain!
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3">How do I “own” my name?</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              When you purchase a name, KAP will mint an NFT with your user
              specific information and issue it to your wallet address. By
              owning the NFT, you own your name.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h3">Can I own more than one name?</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Absolutely. You can have as many names as you want to manage. If
              you have more than one KAP account in a single wallet address, you
              simply need to declare your primary name in the KAP dashboard.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default About;
