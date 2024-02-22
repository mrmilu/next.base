import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV == "production") {
    res.status(200).json({ message: "Not found" });
  } else {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_PROXY_ENDPOINT}${req.url?.replace(/^\/api\/graphql/, "/api")}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const json = await response.json();
    res.status(200).json(json);
  }
}

export const config = {
  api: {
    externalResolver: true
    // Uncomment to fix stalled POST requests
    // https://github.com/chimurai/http-proxy-middleware/issues/795#issuecomment-1314464432
    // bodyParser: false,
  }
};
