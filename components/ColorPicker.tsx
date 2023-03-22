import {
  Box,
  Card,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

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
  const initialFocusRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState(value);
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const [popoverHasFocus, setPopoverHasFocus] = useState(false);

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
    <Popover
      initialFocusRef={initialFocusRef}
      isOpen={popoverHasFocus || inputHasFocus}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <InputGroup width="10em">
          <Input
            variant="filled"
            placeholder="Theme Color"
            value={input}
            onChange={handleInputChange}
            isInvalid={hasError}
            paddingStart="7"
            ref={initialFocusRef}
            onFocus={() => setInputHasFocus(true)}
            onBlur={() => setInputHasFocus(false)}
            {...inputProps}
          />
          <InputLeftElement pointerEvents="none">#</InputLeftElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent
        width="unset"
        onFocus={() => setPopoverHasFocus(true)}
        onBlur={() => setPopoverHasFocus(false)}
      >
        <PopoverBody padding="2">
          <Stack>
            <HexColorPicker
              color={`#${value}`}
              onChange={(color) => {
                setHasError(false);
                setValue(color.substring(1));
              }}
            />
            {hasError && (
              <Card bg="red.500" color="white" padding="3">
                Invalid color code
              </Card>
            )}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
