import { DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  keyframes,
  Select,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAccount } from "../context/AccountProvider";
import { useCart } from "../context/CartProvider";
import ConnectWallet from "./ConnectWallet";
import CTA from "./CTA";
import Cart from "./icons/Cart";

export default function CartDrawer() {
  const {
    state: { items, totalPrice },
    upsertItem,
    removeItem,
    isCartOpen,
    onCartOpen,
    onCartClose,
  } = useCart();
  const {
    query: { q },
  } = useRouter();
  const { address } = useAccount();
  const muted = useColorModeValue("gray.600", "gray.400");
  const isFloating = useBreakpointValue({ base: true, sm: false });
  const floatingBorder = useColorModeValue("white", "gray.700");

  const pulse = keyframes`
    0% {transform: scale(1);}
    25% {transform: scale(1.1);}
    50% {transform: scale(1);}
    75% {transform: scale(1.1);}
    100% {transform: scale(1);}
  `;
  const pulseMobile = keyframes`
    0% {transform: scale(1) rotate(-45deg);}
    25% {transform: scale(1.05) rotate(-45deg);}
    50% {transform: scale(1) rotate(-45deg);}
    75% {transform: scale(1.05) rotate(-45deg);}
    100% {transform: scale(1) rotate(-45deg);;}
  `;

  const itemNames = Object.keys(items || {});

  return (
    <>
      {itemNames.length > 0 &&
        (isFloating ? (
          <IconButton
            aria-label="Cart"
            background="brand.orange"
            onClick={onCartOpen}
            color="white"
            variant="solid"
            size="lg"
            width="10em"
            height="10em"
            _hover={{
              background: "brand.orange",
            }}
            transform="rotate(-45deg)"
            position="fixed"
            bottom="-6em"
            right="-6em"
            paddingBottom="7em"
            zIndex="1000"
            borderColor={floatingBorder}
            borderWidth="2px"
            animation={`${pulseMobile} 1s ease-in-out`}
          >
            <Cart color="white" size="1.5em" />
          </IconButton>
        ) : (
          <Button
            variant="solid"
            minWidth="unset"
            fontWeight="bold"
            background="brand.orange"
            color="white"
            boxSizing="border-box"
            _hover={{
              background: "brand.navy",
            }}
            size="lg"
            onClick={onCartOpen}
            leftIcon={<Cart color="white" size="1.25em" />}
            animation={`${pulse} 1s ease-in-out`}
          >
            Cart
          </Button>
        ))}
      <Drawer isOpen={isCartOpen} onClose={onCartClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody>
            <Flex direction="column">
              {itemNames.map((name) => (
                <Box key={name}>
                  <Flex
                    justifyContent="space-between"
                    alignItems="top"
                    marginBottom="3"
                  >
                    <Text fontSize="3xl" wordBreak="break-all" lineHeight="1.1">
                      {name}
                      <wbr />
                      <Text as="span" color={muted} wordBreak="keep-all">
                        .koin
                      </Text>
                    </Text>
                    <IconButton
                      aria-label={`Remove ${name}.koin from cart`}
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem({ name })}
                    >
                      <DeleteIcon color={muted} />
                    </IconButton>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center">
                    {items[name].price === 0 ? (
                      <>
                        <Flex
                          borderWidth="1px"
                          height="2.5rem"
                          borderRadius="8"
                          paddingX="1rem"
                          gap="2"
                          alignItems="center"
                        >
                          <Text>Forever</Text>
                          <Tooltip label="Free names are registered once and owned forever. No need to renew annually.">
                            <InfoOutlineIcon fontSize="0.8em" />
                          </Tooltip>
                        </Flex>
                        <Text fontSize="2xl" textAlign="right">
                          FREE
                        </Text>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </Flex>
                  <Divider marginTop="6" marginBottom="5" />
                </Box>
              ))}
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Stack spacing="2" width="100%">
              {address ? (
                <>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="2xl">Total:</Text>
                    <Text fontSize="3xl">
                      {totalPrice === 0 ? "FREE" : `$${totalPrice}`}
                    </Text>
                  </Flex>
                  <CTA
                    label="Checkout"
                    size="lg"
                    onClick={() => alert("This will mint")}
                  />
                  <Text color={muted}>
                    Once you sign with your wallet, your selected NFTs will be
                    minted and you will be charged X $KOIN.
                  </Text>
                </>
              ) : (
                <>
                  <Heading textAlign="center">Connect to Checkout</Heading>
                  <ConnectWallet />
                </>
              )}
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
