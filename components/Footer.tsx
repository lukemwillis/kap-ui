import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      gap="8"
      fontWeight="bold"
      flexShrink="0"
      lineHeight="3em"
    >
      <Link href="/">
        <a>HOME</a>
      </Link>
      <Link href="/about">
        <a>ABOUT</a>
      </Link>
      <Link href="/pricing">
        <a>PRICING</a>
      </Link>
    </Flex>
  );
}
