import { Flex } from "@chakra-ui/react";
import AccountConnector from "./AccountConnector";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import SitePreferences from "./SitePreferences";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartProvider";

export default function Header() {
  const router = useRouter();
  const {
    state: { items },
  } = useCart();
  const hasItems = Object.keys(items || {}).length > 0;

  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} flexShrink="0">
      {router.route !== "/" ? (
        <Link href="/">
          <a>
            <Logo size="3em" />
          </a>
        </Link>
      ) : (
        <span />
      )}
      {hasItems ? (
        <CartDrawer />
      ) : (
        <AccountConnector sitePreferences={<SitePreferences />} />
      )}
    </Flex>
  );
}
