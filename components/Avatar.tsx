import { Image, SkeletonCircle } from "@chakra-ui/react";
import { createAvatar } from "@dicebear/avatars";
import * as identiconStyle from "@dicebear/avatars-identicon-sprites";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAccount } from "../context/AccountProvider";
import { useProfile } from "../context/ProfileProvider";

interface AvatarProps {
  src?: string;
  size: string;
}

function Avatar({ src, size }: AvatarProps) {
  const { address } = useAccount();
  const { avatarSrc } = useProfile();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [address, src, avatarSrc, setHasError]);

  if (!hasError && (src || avatarSrc)) {
    return (
      <Image
        fallback={<SkeletonCircle height={size} width={size} flexShrink="0" />}
        src={src || avatarSrc}
        width={size}
        height={size}
        borderRadius="50%"
        borderWidth="1px"
        overflow="hidden"
        alt="KAP Account Avatar"
        onError={() => setHasError(true)}
      />
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
          overflow: "hidden",
          flexShrink: "0",
          background: "white",
        }}
      />
    );
  }
}

export default dynamic(() => Promise.resolve(Avatar), {
  ssr: false,
});
