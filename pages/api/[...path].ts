import { createProxyMiddleware } from "http-proxy-middleware";
import * as process from "process";
import type { NextApiRequest, NextApiResponse } from "next";

const proxyMiddleware = createProxyMiddleware<NextApiRequest, NextApiResponse>({
  target: process.env.NEXT_PUBLIC_REST_PROXY_ENDPOINT,
  changeOrigin: true,
  pathRewrite: async function (path) {
    console.log(path);
    console.log(path.replace(/^\/api/, ""));
    return path.replace(/^\/api/, "");
  }
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  proxyMiddleware(req, res, (result: unknown) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}

export const config = {
  api: {
    externalResolver: true
    // Uncomment to fix stalled POST requests
    // https://github.com/chimurai/http-proxy-middleware/issues/795#issuecomment-1314464432
    // bodyParser: false,
  }
};
