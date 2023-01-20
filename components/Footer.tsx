import { Flex, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      gap="8"
      h={20}
      fontWeight="bold"
    >
      <Link href="/about">
        <a>ABOUT</a>
      </Link>
      <Link href="/faq">
        <a>FAQ</a>
      </Link>
      <Link href="/pricing">
        <a>PRICING</a>
      </Link>
    </Flex>
  );
}
