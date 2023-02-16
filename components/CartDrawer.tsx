import { DeleteIcon } from "@chakra-ui/icons";
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
  Progress,
  Select,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { utils } from "koilib";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "../context/AccountProvider";
import { useCart } from "../context/CartProvider";
import { useNameService } from "../context/NameServiceProvider";
import { useUsdOracle } from "../context/UsdOracleProvider";
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
  const { mint, isMinting } = useNameService();
  const { getLatestKoinPrice } = useUsdOracle();
  const { address } = useAccount();
  const muted = useColorModeValue("gray.600", "gray.400");
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const floatingBorder = useColorModeValue("white", "gray.800");

  const [koinPrice, setKoinPrice] = useState("");
  useEffect(() => {
    getLatestKoinPrice().then((result) => setKoinPrice(result?.price || ""));
  }, [getLatestKoinPrice]);

  const pulse = keyframes`
    30% { transform: scale(1.1); }
    40%, 60% { transform: rotate(-5deg) scale(1.1); }
    50% { transform: rotate(5deg) scale(1.1); }
    70% { transform: rotate(0deg) scale(1.1); }
    100% { transform: scale(1); }
  `;
  const pulseMobile = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(-45deg); }
  `;

  const itemNames = Object.keys(items || {});

  return (
    <>
      {itemNames.length > 0 &&
        (isMobile ? (
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
            transformOrigin="left top"
            transform="rotate(-45deg)"
            position="fixed"
            bottom="-11em"
            right="-4em"
            paddingBottom="7em"
            zIndex="1000"
            borderColor={floatingBorder}
            borderWidth="4px"
            animation={isCartOpen ? "" : `${pulseMobile} 0.25s ease-in-out`}
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
            animation={isCartOpen ? "" : `${pulse} 0.5s ease-in-out`}
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
                  <Flex justifyContent="space-between" alignItems="center">
                    <span />
                    <Skeleton isLoaded={!!koinPrice}>
                      <Text fontSize="xl">
                        {utils.formatUnits(
                          parseInt(koinPrice || "0") * totalPrice,
                          8
                        )}{" "}
                        $KOIN
                      </Text>
                    </Skeleton>
                  </Flex>
                  {isMinting ? (
                    <Progress
                      isIndeterminate
                      height={12}
                      borderRadius="md"
                      colorScheme="gray"
                    />
                  ) : (
                    <CTA label="Checkout" size="lg" onClick={mint} />
                  )}
                  <Text color={muted}>
                    Once you sign with your wallet, your selected NFTs will be
                    minted and you will be charged the total $KOIN amount.
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
