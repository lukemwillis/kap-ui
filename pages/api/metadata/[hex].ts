import { NextApiRequest, NextApiResponse } from "next";
import { isASCII } from "../../../utils/characterSet";
import { toASCII } from "punycode";

export default function generateSvg(req: NextApiRequest, res: NextApiResponse) {
  const { hex } = req.query;

  if (typeof hex === "string" && /^0x([a-fA-F0-9]{2})+$/.test(hex)) {
    let name = Buffer.from(hex.substring(2), "hex").toString("utf8");
    let description = `${name}, a KAP name.`;

    if (!isASCII(name)) {
      name = `${toASCII(name)} ⚠️`;
      description =
        "⚠️ ATTENTION: This name contains non-ASCII characters as shown above. " +
        "Please be aware that there are characters that look identical or very " +
        "similar to English letters, especially characters from Cyrillic and Greek. " +
        "Also, traditional Chinese characters can look identical or very similar to " +
        "simplified variants. For more information: " +
        "https://en.wikipedia.org/wiki/IDN_homograph_attack";
    }

    res
      .status(200)
      .setHeader("Cache-Control", "max-age=43200, immutable")
      .json({
        name,
        description,
        image: `${process.env.NFT_IMAGE_URL}${hex}`,
      });
  } else {
    res.status(500).json({ error: "Hex parameter is required" });
  }
}
