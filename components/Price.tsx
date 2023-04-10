import { Text } from "@chakra-ui/react";
import { calculatePrice } from "../context/CartProvider";

interface PriceProps {
  query: string;
  years?: number;
}

export default function Price({ query, years }: PriceProps) {
  if (query.length === 0) return <></>;
  const encoder = new TextEncoder();
  const length = encoder.encode(query).length;
  return (
    <Text>
      <Text as="span" fontSize="2xl" verticalAlign="middle">
        {length > 10 ? "FREE FOREVER" : `$${calculatePrice(query, years)}`}
      </Text>
      {!years && length < 11 && (
        <Text as="span" fontSize="lg" verticalAlign="middle">
          /year
        </Text>
      )}
    </Text>
  );
}
