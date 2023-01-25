import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import Free from "../components/icons/Free";
import Name from "../components/icons/Name";
import Security from "../components/icons/Security";
import OutboundLink from "../components/OutboundLink";

const About: NextPage = () => {
  return (
    <Box width="100%">
      <Heading as="h1">Koinos Account Protocol</Heading>
      <Flex
        textAlign="center"
        gap={{ base: "4", md: "8" }}
        marginY={{ base: "4", md: "8" }}
        flexWrap="wrap"
      >
        <Box
          padding={{ base: "6", md: "12" }}
          borderRadius="8"
          background="brand.navy"
          color="white"
          flex="1"
        >
          <Name color="white" size="5em" />
          <Heading>NFT Name Service</Heading>
        </Box>
        <Box
          padding={{ base: "6", md: "12" }}
          borderRadius="8"
          background="brand.navy"
          color="white"
          flex="1"
        >
          <Security color="white" size="5em" />
          <Heading>Account Security</Heading>
        </Box>
        <Box
          padding={{ base: "6", md: "12" }}
          borderRadius="8"
          background="brand.navy"
          color="white"
          flex="1"
        >
          <Free color="white" size="5em" />
          <Heading>Free dApp Access</Heading>
        </Box>
      </Flex>
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
            Koinos Account Protocol simplifies how you access dApps built on the
            Koinos blockchain. KAP is the easiest way to customize your
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
            meaning you won&apos;t need any cryptocurrency to get a KAP account,
            or even use blockchain!
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading as="h3">Where can I find the whitepaper?</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Right here:{" "}
            <OutboundLink href="https://kap-domains-bucket.s3.us-east-1.amazonaws.com/kap-whitepaper.pdf">
              read the whitepaper
            </OutboundLink>
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
            specific information and issue it to your wallet address. By owning
            the NFT, you own your name.
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
            Absolutely. You can have as many names as you want to manage. If you
            have more than one KAP account in a single wallet address, you
            simply need to declare your primary name in the KAP dashboard.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default About;
