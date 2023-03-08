import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Tooltip,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

interface ColorPickerProps {
  value: string;
  setValue: (val: string) => void;
  hasError: boolean;
  setHasError: (val: boolean) => void;
}

const COLOR_REGEX = /^([0-9a-fA-F]{3}){1,2}$/;

export default function ColorPicker({
  value,
  setValue,
  hasError,
  setHasError,
  ...inputProps
}: ColorPickerProps & InputProps) {
  const [input, setInput] = useState(value);
  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(COLOR_REGEX)) {
      setHasError(false);
      setValue(e.target.value);
    } else {
      setHasError(true);
    }
    setInput(e.target.value);
  };

  return (
    <Tooltip
      hasArrow
      label="Invalid color code"
      isOpen={hasError}
      isDisabled={!hasError}
      bg="red.500"
      color="white"
    >
      <InputGroup width="10em">
        <Input
          variant="filled"
          placeholder="Theme Color"
          value={input}
          onChange={handleInputChange}
          isInvalid={hasError}
          paddingStart="7"
          {...inputProps}
        />
        <InputLeftElement pointerEvents="none">#</InputLeftElement>
      </InputGroup>
    </Tooltip>
  );
}
