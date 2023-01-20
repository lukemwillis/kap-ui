import { Image } from "@chakra-ui/react";
import { createAvatar } from "@dicebear/avatars";
import { useAccount } from "../context/AccountProvider";
import * as identiconStyle from "@dicebear/avatars-identicon-sprites";

interface AvatarProps {
  size: string;
}

export default function Avatar({ size }: AvatarProps) {
  const { account } = useAccount();

  // TODO pull avatar from chain, use identicon as backup
  if (account === "1Phen7sf6kjAgJ3jwiheWW6SFDumDoWgUf") {
    return (
      <Image
        src="https://bafybeial7korh5zldyo7qmz4kkeeo5tt7tybhd7jiorz2nx7iwvpzeadhi.ipfs.nftstorage.link/assets/01.png"
        width={size}
        height={size}
        borderRadius="50%"
        borderWidth="1px"
        overflow="hidden"
        alt="KAP Account Avatar"
      />
    );
  } else {
    const identicon = createAvatar(identiconStyle, { seed: account });

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
