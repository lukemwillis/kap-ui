import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea as Txa,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface TextareaProps {
  label: string;
  max: number;
  placeholder: string;
  isThemeLight: boolean;
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}

export default function Textarea({
  label,
  max,
  placeholder,
  isThemeLight,
  value,
  setValue,
  disabled = false,
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = "0";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <InputGroup>
      <Txa
        variant="filled"
        placeholder={placeholder}
        resize="none"
        paddingTop="2em"
        value={value}
        onChange={handleChange}
        overflow="hidden"
        ref={ref}
        isInvalid={value.length > max}
        _invalid={{
          borderColor: "red.400",
        }}
        background={isThemeLight ? "blackAlpha.300" : "whiteAlpha.300"}
        _hover={{
          background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
        }}
        _focusVisible={{
          background: isThemeLight ? "blackAlpha.200" : "whiteAlpha.200",
        }}
        _placeholder={{
          color: isThemeLight ? "gray.600" : "gray.300",
        }}
        isDisabled={disabled}
      />
      <InputLeftElement pointerEvents="none">{label}</InputLeftElement>
      {value.length > 0 && (
        <InputRightElement
          color={value.length > max ? "red.400" : "inherit"}
          width="auto"
          marginRight="2"
          pointerEvents="none"
        >
          {value.length}/{max}
        </InputRightElement>
      )}
    </InputGroup>
  );
}
