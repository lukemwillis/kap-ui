import { Flex } from "@chakra-ui/react";
import AccountConnector from "./AccountConnector";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import SitePreferences from "./SitePreferences";

export default function Header() {
  const router = useRouter();

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      flexShrink="0"
    >
      {router.route !== "/" ? (
        <Link href="/">
          <a>
            <Logo size="3em" />
          </a>
        </Link>
      ) : (
        <span />
      )}
      <AccountConnector sitePreferences={<SitePreferences />} />
    </Flex>
  );
}
