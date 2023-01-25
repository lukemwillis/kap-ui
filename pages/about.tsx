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
import Free from "../components/icons/Free";
import Name from "../components/icons/Name";
import Security from "../components/icons/Security";
import OutboundLink from "../components/OutboundLink";

const About: NextPage = () => {
  return (
    <Box width="100%">
      <Heading as="h1">Koinos Account Protocol</Heading>
      <Flex textAlign="center" gap={{ base: "4", md: "8" }} marginY={{ base: "4", md: "8" }} flexWrap="wrap">
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
            KAP simplifies how you access the blockchain by eliminating
            complexity and it&apos;ll be the only stop you&apos;ll ever need to
            manage your blockchain experience. Users simply get a KAP account
            name and start using blockchain right away! KAP will launch with
            premium account access and evolve by adding a host of features
            including Mana sharing, account recovery and more, all in one place.
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
            characters is likely to be highly desirable and thus considered as
            “premium” accounts. These names will have 10 or less characters and
            will be priced based on character count only (price schedule
            forthcoming).
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
            Anyone will be able to own a KAP account. We&apos;ll start by
            offering premium KAP accounts which will require users to own some
            $KOIN. A few months after our premium offering, we&apos;ll release
            our free tier of KAP accounts, meaning you wont need any
            cryptocurrency to get a KAP account!
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
            have more than 1 KAP account in a single wallet address, you simply
            need to declare your primary name in the KAP dashboard.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default About;
