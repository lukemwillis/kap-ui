import { Flex, Stack } from "@chakra-ui/react";
import AccountConnector from "./AccountConnector";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import SitePreferences from "./SitePreferences";

export default function Header() {
  const router = useRouter();

  return (
    <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
      {router.route !== "/" ? (
        <Link href="/">
          <a>
            <Logo size="48px" />
          </a>
        </Link>
      ) : (
        <span />
      )}
      <AccountConnector sitePreferences={<SitePreferences />} />
    </Flex>
  );
}
