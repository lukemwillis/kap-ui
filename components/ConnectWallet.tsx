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
  const { address, connectKondor, connectMKW, isMKWSupported } = useAccount();
  const toast = useToast();

  const connectCallback = async (wallet: "Kondor" | "MKW") => {
    let connected = false;

    if (onClick) {
      onClick();
    }

    if (wallet === "Kondor") {
      connected = await connectKondor();
    } else if (wallet === "MKW") {
      if (!isMKWSupported) {
        // TODO LMW check for popup support
        toast({
          title: "Check browser settings",
          description:
            "MKW requires support for 'cross-site cookies'. Please check your browser settings if you want to connect with MKW.",
          status: "error",
          isClosable: true,
        });
        return;
      }
      connected = await connectMKW();
    }

    if (!connected) {
      toast({
        title: `Failed to connect with ${wallet}`,
        description: `Please check that you have ${wallet} ${
          wallet === "Kondor" ? "installed" : "set up"
        } in this browser and try again.`,
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (onConnect) {
      onConnect();
    }
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
          onClick={() => connectCallback("MKW")}
          aria-label="Connect with MKW"
          flex="1"
          height="auto"
          padding="4"
          icon={<Image src="/mkw-logo.png" alt="MKW Logo" height={16} />}
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
            href="https://chrome.google.com/webstore/detail/kondor/ghipkefkpgkladckmlmdnadmcchefhjl"
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
            href="https://mykw.vercel.app"
            target="_blank"
            justifyContent="start"
            leftIcon={<Image src="/mkw-logo.png" alt="MKW Logo" height={6} />}
          >
            Set up My Koinos Wallet
          </Button>
        </>
      )}
    </>
  );
}
