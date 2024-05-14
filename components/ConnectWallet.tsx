import {
  Button,
  useToast,
  Image,
  StackDivider,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";
interface ConnectWalletProps {
  onConnect?: () => void;
  onClick?: () => void;
}

export default function ConnectWallet({
  onConnect,
  onClick,
}: ConnectWalletProps) {
  const { address, connectKondor, connectWalletConnect } = useAccount();
  const toast = useToast();

  const connectCallback = async (wallet: "Kondor" | "WalletConnect") => {
    let connected = false;

    if (onClick) {
      onClick();
    }

    if (wallet === "Kondor") {
      connected = await connectKondor();
    } else if (wallet === "WalletConnect") {
      connected = await connectWalletConnect();
    }

    if (!connected) {
      toast({
        title: `Failed to connect with ${wallet}`,
        description: `Please check that you have ${
          wallet === "Kondor" ? "Kondor installed" : "a WalletConnect compatible wallet set up"
        } and try again.`,
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    onConnect?.();
  };
  return (
    <>
      <Flex gap="2">
        <IconButton
          onClick={() => connectCallback("Kondor")}
          aria-label="Connect with Kondor"
          flex="1"
          height="auto"
          padding="4"
          icon={<Image src="/kondor-logo.png" alt="Kondor Logo" height={16} />}
        />
        <IconButton
          onClick={() => connectCallback("WalletConnect")}
          aria-label="Connect with WalletConnect"
          flex="1"
          height="auto"
          padding="4"
          icon={<Image src="/wallet-connect-logo.png" alt="WalletConnect Logo" height={16} />}
        />
      </Flex>
      {!address && (
        <>
          <StackDivider
            display="flex"
            alignItems="center"
            gap="2"
            color="gray.500"
            _before={{
              background: "gray.500",
              content: '""',
              flexGrow: 1,
              height: "1px",
            }}
            _after={{
              background: "gray.500",
              content: '""',
              flexGrow: 1,
              height: "1px",
            }}
          >
            need a wallet?
          </StackDivider>
          <Button
            as="a"
            href="//chrome.google.com/webstore/detail/kondor/ghipkefkpgkladckmlmdnadmcchefhjl"
            target="_blank"
            justifyContent="start"
            leftIcon={
              <Flex width="6" justifyContent="center">
                <Image src="/kondor-logo.png" alt="Kondor Logo" height={6} />
              </Flex>
            }
          >
            Install Kondor Wallet
          </Button>
          <Button
            as="a"
            href="//konio.io/"
            target="_blank"
            justifyContent="start"
            leftIcon={<Image src="/konio-logo.jpg" alt="Konio Logo" height={6} />}
          >
            Download Konio
          </Button>
        </>
      )}
    </>
  );
}
