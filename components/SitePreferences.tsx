import {
  Button,
  useColorMode,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function SitePreferences() {
  const { colorMode, setColorMode } = useColorMode();
  return (
    <ButtonGroup isAttached variant="outline">
      <Button
        leftIcon={<SunIcon />}
        onClick={() => setColorMode("light")}
        isActive={colorMode === "light"}
        width="50%"
        borderWidth="2px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
      >
        Light
      </Button>
      <Button
        leftIcon={<MoonIcon />}
        onClick={() => setColorMode("dark")}
        isActive={colorMode === "dark"}
        width="50%"
        borderWidth="2px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
      >
        Dark
      </Button>
    </ButtonGroup>
  );
}
