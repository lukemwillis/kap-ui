import {
  Box,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Price from "./Price";
import Search from "./Search";

interface PricingExplainerProps {
  initialQuery: string;
}

const NUMBERS = "1234567890";

export default function PricingExplainer({
  initialQuery,
}: PricingExplainerProps) {
  const [query, setQuery] = useState(initialQuery);
  const onSliderChange = (val: number) => {
    if (initialQuery.length > val) {
      setQuery(initialQuery.substring(0, val));
    } else {
      setQuery(initialQuery + NUMBERS.substring(0, val - initialQuery.length));
    }
  };
  const length = Math.min(query.length, 11);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent={{ base: "center", md: "space-between" }}
        flexWrap="wrap"
        gap="4"
        mt="4"
      >
        <Flex gap="4">
          <Search
            value={query}
            setValue={setQuery}
            inlineButton={useBreakpointValue({ base: true, md: false })}
            autoFocus={false}
          />
        </Flex>
        <Price query={query} />
      </Flex>
      <Box marginX={{ base: "8", md: "10" }} marginTop="5" marginBottom="3">
        <Slider
          focusThumbOnChange={false}
          value={length}
          onChange={onSliderChange}
          min={1}
          max={11}
          step={1}
        >
          <SliderMark
            value={length}
            textAlign="center"
            mt="5"
            ml="-10"
          ></SliderMark>
          <SliderTrack bg={useColorModeValue("gray.200", "gray.700")}>
            <SliderFilledTrack bg="brand.orange" />
          </SliderTrack>
          <SliderThumb boxSize={10} textAlign="center" pt="8" lineHeight="2">
            <Text>
              <Text as="span" display="block" color="black">
                {length}
                {length === 11 && "+"}
              </Text>
              character{length !== 1 && "s"}
            </Text>
          </SliderThumb>
        </Slider>
      </Box>
    </>
  );
}
