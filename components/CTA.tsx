import {
  useColorModeValue,
  ResponsiveValue,
  Button,
} from "@chakra-ui/react";

interface CTAProps {
  size: ResponsiveValue<string>;
  onClick: () => void;
  label: string;
}

export default function CTA({ size, onClick, label }: CTAProps) {
  const buttonBackground = useColorModeValue("brand.navy", "brand.orange");
  const buttonForeground = useColorModeValue("brand.orange", "white");
  return (
    <Button
      variant="solid"
      minWidth="unset"
      fontWeight="bold"
      background={buttonBackground}
      color={"white"}
      borderWidth="2px"
      boxSizing="border-box"
      _hover={{
        background: "transparent",
        borderColor: buttonForeground,
        borderWidth: "2px",
        color: buttonForeground,
      }}
      size={size}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
