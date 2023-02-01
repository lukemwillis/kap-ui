import { useColorModeValue, Image, ResponsiveValue } from "@chakra-ui/react";

interface LogoProps {
    size: ResponsiveValue<string>;
    inverse?: boolean;
}

export default function Logo({ size, inverse = false }: LogoProps) {
  return (
      <Image
        src={useColorModeValue(`/logo${inverse ? '-inverse' : ''}.png`, `/logo${!inverse ? '-inverse' : ''}.png`)}
        alt="KAP Logo"
        height={size}
      />
  );
}
