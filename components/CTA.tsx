import { useColorModeValue, ResponsiveValue, Button } from "@chakra-ui/react";
import React, { ComponentType, useState } from "react";
import IconProps from "./icons/IconProps";

interface CTAProps {
  size: ResponsiveValue<string>;
  onClick: () => void;
  label: string;
  leftIcon?: ComponentType<IconProps>;
  rightIcon?: ComponentType<IconProps>;
  secondary?: boolean;
}
export default React.forwardRef(function CTA(
  {
    size,
    onClick,
    label,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    secondary,
  }: CTAProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
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
      rightIcon={
        RightIcon && (
          <RightIcon
            size="1.25em"
            color={
              hover ? buttonForeground : secondary ? buttonBackground : "white"
            }
          />
        )
      }
      ref={ref}
    >
      {label}
    </Button>
  );
});
