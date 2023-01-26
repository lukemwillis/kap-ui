import { useColorModeValue, ResponsiveValue, Button } from "@chakra-ui/react";
import { ComponentType, useState } from "react";
import IconProps from "./icons/IconProps";

interface CTAProps {
  size: ResponsiveValue<string>;
  onClick: () => void;
  label: string;
  leftIcon?: ComponentType<IconProps>;
  secondary?: boolean;
}

export default function CTA({
  size,
  onClick,
  label,
  leftIcon: LeftIcon,
  secondary,
}: CTAProps) {
  const [hover, setHover] = useState(false);
  const buttonBackground = useColorModeValue("brand.navy", "brand.orange");
  const buttonForeground = useColorModeValue("brand.orange", "white");
  return (
    <Button
      variant={secondary ? "outline" : "solid"}
      minWidth="unset"
      fontWeight="bold"
      background={secondary ? "transparent" : buttonBackground}
      borderColor={buttonBackground}
      color={secondary ? buttonBackground : "white"}
      borderWidth="2px"
      boxSizing="border-box"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      _hover={{
        background: "transparent",
        borderColor: buttonForeground,
        borderWidth: "2px",
        color: buttonForeground,
      }}
      size={size}
      onClick={onClick}
      leftIcon={
        LeftIcon && (
          <LeftIcon
            size="1.25em"
            color={
              hover ? buttonForeground : secondary ? buttonBackground : "white"
            }
          />
        )
      }
    >
      {label}
    </Button>
  );
}
