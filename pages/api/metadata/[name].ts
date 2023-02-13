import { NextApiRequest, NextApiResponse } from "next";

export default function generateSvg(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (name) {
    // TODO pull name from blockchain
    if (true) {
      res
        .status(200)
        .setHeader("Cache-Control", "max-age=43200, immutable")
        .json({
            name,
            description: "It's a KAP name.",
            image: `https://kap.domains/api/svg/${name}`
        });
    } else {
      res.status(404).json({ error: `Name '${name}' not found` });
    }
  } else {
    res.status(500).json({ error: "Name parameter is required" });
  }
}
