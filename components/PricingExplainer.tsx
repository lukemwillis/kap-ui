import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Price from "./Price";
import SearchBox from "./SearchBox";

interface PricingExplainerProps {
  initialQuery: string;
}

const NUMBERS = "1234567890";

export default function PricingExplainer({
  initialQuery,
}: PricingExplainerProps) {
  const [query, setQuery] = useState(initialQuery);
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery, setQuery]);

  const onSliderChange = (val: number) => {
    if (initialQuery.length > val) {
      setQuery(initialQuery.substring(0, val));
    } else {
      setQuery(initialQuery + NUMBERS.substring(0, val - initialQuery.length));
    }
  };
  const length = Math.min(query.length, 11);

  return (
    <Flex
      mt={{ base: "2", md: "4" }}
      direction="column"
      gap={{ base: "2", md: "4" }}
    >
      <Flex
        alignItems="center"
        justifyContent={{ base: "center", md: "space-between" }}
        flexWrap="wrap"
        gap="4"
      >
        <Flex gap="4">
          <SearchBox
            value={query}
            setValue={setQuery}
            inlineButton={useBreakpointValue({ base: true, md: false })}
            autoFocus={false}
            secondaryCTA
          />
        </Flex>
        <Price query={query} />
      </Flex>
      <Box marginX="1.25em" marginTop="1" marginBottom="5">
        <Slider
          focusThumbOnChange={false}
          value={length}
          onChange={onSliderChange}
          min={1}
          max={11}
          step={1}
        >
          <SliderTrack bg={useColorModeValue("gray.200", "gray.700")}>
            <SliderFilledTrack bg="brand.orange" />
          </SliderTrack>
          <SliderThumb boxSize={10} pt="8" lineHeight="2">
            <Text textAlign="center">
              <Text as="span" display="block" color="gray.800">
                {length}
                {length === 11 && "+"}
              </Text>
              <Text
                as="span"
                display="block"
                marginLeft={
                  length === 0 ? "2.75em" : length === 1 ? "2.25em" : ""
                }
                marginRight={length > 10 ? "2.75em" : ""}
              >
                character{length !== 1 && "s"}
              </Text>
            </Text>
          </SliderThumb>
        </Slider>
      </Box>
    </Flex>
  );
}
