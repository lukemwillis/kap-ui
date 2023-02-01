import { Icon } from "@chakra-ui/react";
import IconProps from "./IconProps";

export default function Send({ size, color }: IconProps) {
  return (
    <Icon width={size} height={size} color={color} viewBox="0 0 1200 1200">
      <path
        d="m24.828 1113.1 1162.8-496.55c16.551-8.2773 16.551-28.965 0-33.102l-1162.8-500.69c-12.414-4.1367-24.828 4.1367-24.828 20.691l24.828 372.41c4.1367 8.2773 8.2773 16.551 16.551 16.551l480 91.035c16.551 4.1367 16.551 28.965 0 33.102l-480 86.898c-8.2773 4.1367-12.414 8.2773-12.414 16.551l-28.965 376.55c0 12.414 12.414 20.691 24.828 16.551z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </Icon>
  );
}
