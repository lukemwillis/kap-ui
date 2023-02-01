import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

interface ColorPickerProps {
  value: string;
  setValue: (val: string) => void;
}

const COLOR_REGEX = /^([0-9a-fA-F]{3}){1,2}$/;

export default function ColorPicker({
  value,
  setValue,
  ...inputProps
}: ColorPickerProps & InputProps) {
  const [input, setInput] = useState(value);
  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(COLOR_REGEX)) {
      setValue(e.target.value);
    }
    setInput(e.target.value);
  };

  return (
    <InputGroup width="10em">
      <Input
        variant="filled"
        placeholder="Theme Color"
        value={input}
        onChange={handleInputChange}
        isInvalid={!input.match(COLOR_REGEX)}
        paddingStart="7"
        {...inputProps}
      />
      <InputLeftElement pointerEvents="none">#</InputLeftElement>
    </InputGroup>
  );
}
