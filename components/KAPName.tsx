import { useAccount } from "../context/AccountProvider";

export default function KAPName() {
  const { account } = useAccount();

  // TODO pull name from chain
  if (account === "1Phen7sf6kjAgJ3jwiheWW6SFDumDoWgUf") {
    return <>luke.koin</>;
  } else {
    // TODO better fallback
    return <>nobody</>;
  }
}
