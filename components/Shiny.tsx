import { Flex, ResponsiveValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import Sparkle from "./icons/Sparkle";

interface ShinyProps {
  size: ResponsiveValue<string>;
  color: string;
  children: ReactNode;
}

export default function Shiny({ size, color, children }: ShinyProps) {
  return (
    <Flex alignItems="start" marginLeft={`-${size}`}>
      <Sparkle size={size} color={color} />
      {children}
    </Flex>
  );
}
