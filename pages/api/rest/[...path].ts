import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV == "production") {
    res.status(200).json({ message: "Not found" });
  } else {
    const url = `${process.env.NEXT_PUBLIC_REST_PROXY_ENDPOINT}${req.url?.replace(/^\/api\/rest/, "")}`;
    const response = await fetch(url, {
      method: req.method,
      ...(req.method != "GET" && req.method != "HEAD" ? { body: req.body } : {})
    });
    res.status(200).json(await response.json());
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
