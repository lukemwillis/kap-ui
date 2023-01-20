import { useColorModeValue, Image, ResponsiveValue } from "@chakra-ui/react";

interface LogoProps {
    size: ResponsiveValue<string>;
}

export default function Logo({ size }: LogoProps) {
  return (
      <Image
        src={useColorModeValue("/logo.png", "/logo-inverse.png")}
        alt="KAP Logo"
        height={size}
      />
  );
}
