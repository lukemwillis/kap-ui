import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "../context/AccountProvider";
import { useCart } from "../context/CartProvider";
import AccountConnector from "./AccountConnector";
import CTA from "./CTA";
import Cart from "./icons/Cart";
import Price from "./Price";

export default function CartDrawer() {
  const {
    state: { items, totalPrice },
    upsertItem,
    isCartOpen,
    onCartOpen,
    onCartClose,
  } = useCart();
  const [isFirstItem, setIsFirstItem] = useState(true);
  const {
    query: { q },
  } = useRouter();
  const { address } = useAccount();
  const muted = useColorModeValue("gray.600", "gray.400");

  const itemNames = Object.keys(items || {});
  useEffect(() => {
    if (isFirstItem && itemNames.length > 0) {
      onCartOpen();
      setIsFirstItem(false);
    }
  }, [itemNames, isFirstItem, onCartOpen]);

  return (
    <>
      {itemNames.length > 0 && (
        <CTA
          onClick={onCartOpen}
          label="Cart"
          size="md"
          leftIcon={Cart}
          secondary={typeof q === "string" && items && !items[q]}
        />
      )}
      <Drawer isOpen={isCartOpen} onClose={onCartClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerBody>
            <Flex direction="column">
              {itemNames.map((name) => (
                <Box key={name}>
                  <Text fontSize="3xl">
                    {name}
                    <Text as="span" color={muted}>
                      .koin
                    </Text>
                  </Text>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Select
                      width="auto"
                      value={items[name].years}
                      onChange={(e) =>
                        upsertItem({
                          name: name,
                          years: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value={1}>1 year</option>
                      <option value={2}>2 years</option>
                      <option value={3}>3 years</option>
                      <option value={5}>5 years</option>
                      <option value={10}>10 years</option>
                    </Select>
                    <Text fontSize="2xl">${items[name].price}</Text>
                  </Flex>
                  <Divider marginTop="6" marginBottom="3" />
                </Box>
              ))}
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl">Total:</Text>
                <Text fontSize="3xl">${totalPrice}</Text>
              </Flex>
              <Box textAlign="right" marginTop="10">
                {address ? (
                  <CTA
                    label="Checkout"
                    size="lg"
                    onClick={() => alert("This will mint")}
                  />
                ) : (
                  <AccountConnector />
                )}
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
