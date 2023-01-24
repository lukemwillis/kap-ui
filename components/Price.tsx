import {
  Text,
} from "@chakra-ui/react";

interface PriceProps {
  query: string;
}

export default function Price({ query }: PriceProps) {
  const length = query.length;
  return (
    <Text fontSize="2xl">
      {length === 0
        ? ""
        : length === 1
        ? "$1000/year"
        : length <= 3
        ? "$500/year"
        : length <= 6
        ? "$100/year"
        : length < 11
        ? "$10/year"
        : "FREE FOREVER"}
    </Text>
  );
}
