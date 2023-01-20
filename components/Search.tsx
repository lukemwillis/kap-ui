import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchProps {
  placeholder?: string;
  buttonLabel?: string;
  inlineButton?: boolean;
  onSearch?: () => void;
}

export default function Search({
  placeholder,
  buttonLabel = "Search",
  inlineButton = false,
  onSearch = () => {},
}: SearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const buttonBackground = useColorModeValue("brand.navy", "brand.orange");
  const buttonForeground = useColorModeValue("brand.orange", "white");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <InputGroup maxWidth="30em">
        <Input
          placeholder={placeholder}
          fontSize="xl"
          size="lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter" && query.length > 0) {
              router.push(`/search?q=${query}`);
              onSearch();
            }
          }}
          ref={inputRef}
          _focusVisible={{
            borderColor: useColorModeValue("brand.navy", "white"),
          }}
          paddingRight={inlineButton ? "7em" : "16"}
        />
        <InputLeftElement
          pointerEvents="none"
          fontSize="lg"
          margin="1"
          color={"gray.500"}
        >
          <SearchIcon />
        </InputLeftElement>
        <InputRightElement
          pointerEvents={inlineButton && query ? "auto" : "none"}
          fontSize="lg"
          margin="1"
          color={"gray.500"}
          width="auto"
        >
          <Flex gap="2" alignItems="center" paddingRight="2">
            <Text>.koin</Text>
            {inlineButton && query && (
              <Link href={query.length > 0 ? `/search?q=${query}` : "#"}>
                <Button
                  variant="solid"
                  minWidth="unset"
                  fontWeight="bold"
                  background={buttonBackground}
                  color={"white"}
                  boxSizing="border-box"
                  borderWidth="2px"
                  borderColor={buttonBackground}
                  _hover={{
                    background: "transparent",
                    borderColor: buttonForeground,
                    color: buttonForeground,
                  }}
                  size="sm"
                  onClick={onSearch}
                >
                  {buttonLabel}
                </Button>
              </Link>
            )}
          </Flex>
        </InputRightElement>
      </InputGroup>
      {!inlineButton && (
        <Link href={query.length > 0 ? `/search?q=${query}` : "#"}>
          <Button
            variant="solid"
            minWidth="unset"
            fontWeight="bold"
            background={buttonBackground}
            color={"white"}
            boxSizing="border-box"
            _hover={{
              background: "transparent",
              borderColor: buttonForeground,
              borderWidth: "2px",
              color: buttonForeground,
            }}
            size="lg"
            onClick={onSearch}
          >
            {buttonLabel}
          </Button>
        </Link>
      )}
    </>
  );
}
