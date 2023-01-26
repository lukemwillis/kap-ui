import { Text } from "@chakra-ui/react";
import { calculatePrice } from "../context/CartProvider";

interface PriceProps {
  query: string;
  years?: number;
}

export default function Price({ query, years }: PriceProps) {
  const length = query.length;

  if (length === 0) return <></>;
  return (
    <Text>
      <Text as="span" fontSize="2xl" verticalAlign="middle">
        {length > 10 ? "FREE FOREVER" : `$${calculatePrice(length, years)}`}
      </Text>
      {!years && length < 11 && (
        <Text as="span" fontSize="lg" verticalAlign="middle">
          /year
        </Text>
      )}
    </Text>
  );
}
