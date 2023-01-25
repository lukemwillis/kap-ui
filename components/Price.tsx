import { Text } from "@chakra-ui/react";

interface PriceProps {
  query: string;
}

export default function Price({ query }: PriceProps) {
  const length = query.length;
  return (
    <Text>
      <Text as="span" fontSize="2xl" verticalAlign="middle">
        {length === 0
          ? ""
          : length === 1
          ? "$1000"
          : length <= 3
          ? "$500"
          : length <= 6
          ? "$100"
          : length < 11
          ? "$10"
          : "FREE FOREVER"}
      </Text>
      <Text as="span" fontSize="lg" verticalAlign="middle">
        {length > 0 && length < 11 && "/year"}
      </Text>
    </Text>
  );
}
