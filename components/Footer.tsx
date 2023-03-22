import { Box, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  const router = useRouter();

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap="8"
        fontWeight="bold"
        flexShrink="0"
        lineHeight="3em"
      >
        <NextLink href="/">
          <a>HOME</a>
        </NextLink>
        <NextLink href="/about">
          <a>ABOUT</a>
        </NextLink>
        <NextLink href="/pricing">
          <a>PRICING</a>
        </NextLink>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap="8"
        flexShrink="0"
        lineHeight="3em"
      >
        <Text>&copy; {new Date().getFullYear()} Top Level Accounts, Inc.</Text>
        <IconButton
          as={Link}
          href="https://twitter.com/kapdomains"
          aria-label="KAP Twitter"
          icon={<FaTwitter />}
          variant="link"
        />
      </Flex>
    </Box>
  );
}
