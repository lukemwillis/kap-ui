import { Image, SkeletonCircle } from "@chakra-ui/react";
import { createAvatar } from "@dicebear/avatars";
import * as identiconStyle from "@dicebear/avatars-identicon-sprites";
import { useEffect, useState } from "react";
import { useAccount } from "../context/AccountProvider";
import { useProfile } from "../context/ProfileProvider";

interface AvatarProps {
  src?: string;
  size: string;
}

export default function Avatar({ src, size }: AvatarProps) {
  const { address } = useAccount();
  const { avatarSrc } = useProfile();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (src || avatarSrc) {
      setLoading(true);
    }
  }, [src, avatarSrc, setLoading])

  if (src || avatarSrc) {
    return (
      <SkeletonCircle
        height={size}
        width={size}
        isLoaded={!loading}
        flexShrink="0"
      >
        <Image
          src={src || avatarSrc}
          width={size}
          height={size}
          borderRadius="50%"
          borderWidth="1px"
          overflow="hidden"
          alt="KAP Account Avatar"
          onLoad={() => setLoading(false)}
        />
      </SkeletonCircle>
    );
  } else {
    const identicon = createAvatar(identiconStyle, { seed: address });

    return (
      <div
        dangerouslySetInnerHTML={{ __html: identicon }}
        style={{
          display: "block",
          width: size,
          height: size,
          borderRadius: "50%",
          borderWidth: "1px",
          overflow: "hidden",
          flexShrink: "0",
        }}
      />
    );
  }
}
