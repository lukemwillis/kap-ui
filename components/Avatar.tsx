import { Image } from "@chakra-ui/react";
import { createAvatar } from "@dicebear/avatars";
import * as identiconStyle from "@dicebear/avatars-identicon-sprites";

interface AvatarProps {
  src?: string;
  address?: string;
  size: string;
}

export default function Avatar({ src, address, size }: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        width={size}
        height={size}
        borderRadius="50%"
        borderWidth="1px"
        overflow="hidden"
        alt="KAP Account Avatar"
      />
    );
  } else {
    const identicon = createAvatar(identiconStyle, { seed: address });

    return (
      <span
        dangerouslySetInnerHTML={{ __html: identicon }}
        style={{
          display: "block",
          width: size,
          height: size,
          borderRadius: "50%",
          borderWidth: "1px",
          overflow: "hidden",
        }}
      />
    );
  }
}
