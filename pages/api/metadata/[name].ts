import { NextApiRequest, NextApiResponse } from "next";

export default function generateSvg(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (name) {
    // TODO get_name
    if (true) {
      res
        .status(200)
        .setHeader("Cache-Control", "max-age=43200, immutable")
        .json({
            name,
            description: "It's a KAP name.",
            // TODO env var
            image: `https://test.kap.domains/api/svg/${name}`
        });
    } else {
      res.status(404).json({ error: `Name '${name}' not found` });
    }
  } else {
    res.status(500).json({ error: "Name parameter is required" });
  }
}
