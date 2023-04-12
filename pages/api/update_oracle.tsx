import { NextApiRequest, NextApiResponse } from "next";
import usdoracleAbi from "../../contract/abi/usdoracle-abi.json";
import { Abi } from "koilib/lib/interface";
import { Contract, Provider, Signer } from "koilib";

const abi: Abi = {
  koilib_types: usdoracleAbi.types,
  ...usdoracleAbi,
};

export default function updateOracle(_: NextApiRequest, res: NextApiResponse) {
  fetch("https://api.mexc.com/api/v3/avgPrice?symbol=KOINUSDT")
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((json) => {
      const [whole, decimal] = json.price.split(".");

      const price = `${whole !== "0" ? whole : ""}${(decimal || "")
        .padEnd(8, "0")
        .substring(0, 8)}`;

      const provider = new Provider([process.env.NEXT_PUBLIC_KOINOS_RPC_URL!]);
      const signer = Signer.fromWif(process.env.ORACLE_OPERATOR_WIF!);
      signer.provider = provider;

      const usdOracle = new Contract({
        id: process.env.NEXT_PUBLIC_USD_ORACLE_ADDR,
        abi,
        provider,
        signer,
      });

      usdOracle!.functions
        .set_latest_price<{}>(
          {
            token_address: process.env.NEXT_PUBLIC_KOIN_ADDR,
            price,
          },
          {
            payer: process.env.CRON_PAYER,
            rcLimit: "200000000",
          }
        )
        .then(({ transaction }) => {
          transaction?.wait().then(() => {
            res.status(200).json({ success: true });
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
}
