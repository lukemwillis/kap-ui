import { Box, ResponsiveValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import Sparkle from "./icons/Sparkle";

interface ShinyProps {
  size: ResponsiveValue<string>;
  color: string;
  children: ReactNode;
}

export default function Shiny({ size, color, children }: ShinyProps) {
  return (
    <>
      <Box marginLeft={`-${size}`} display="inline" verticalAlign="super" lineHeight="0">
        <Sparkle size={size} color={color} />
      </Box>
      {children}
    </>
  );
}
