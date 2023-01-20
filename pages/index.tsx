import type { NextPage } from "next";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    colors: { gray, brand, white },
  } = useTheme();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="8"
    >
      <Logo size={{ base: "80px", md: "128px" }} />
      <InputGroup maxWidth="30em">
        <Input
          placeholder="Enter your name..."
          fontSize="xl"
          size="lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter" && query.length > 0) {
              router.push(`/search?q=${query}`);
            }
          }}
          ref={inputRef}
          _focusVisible={{
            borderColor: useColorModeValue(brand.navy, white),
          }}
        />
        <InputRightElement
          pointerEvents="none"
          fontSize="lg"
          margin="1"
          paddingRight="6"
          color={gray[500]}
        >
          .koin
        </InputRightElement>
      </InputGroup>
      <Link href={query.length > 0 ? `/search?q=${query}` : "#"}>
        <Button
          variant="solid"
          minWidth="unset"
          fontWeight="bold"
          background={useColorModeValue(brand.navy, brand.orange)}
          color={white}
          boxSizing="border-box"
          _hover={{
            background: "transparent",
            borderColor: useColorModeValue(brand.orange, white),
            borderWidth: "2px",
            color: useColorModeValue(brand.orange, white),
          }}
          size="lg"
        >
          Search Account Name
        </Button>
      </Link>
    </Flex>
  );
};

export default Home;
