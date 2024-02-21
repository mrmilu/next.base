import type { IEnvVars } from "../interfaces/env_vars";
import { injectable } from "inversify";
import { generatorConf } from "inversify-generator/decorators";

/*
 *  /api starting paths refer to pages/api proxy routes
 */
@injectable()
@generatorConf({ binding: "default" })
export class EnvVars implements IEnvVars {
  apiUrl: string = `${process.env.NEXT_PUBLIC_API_URL}${this.isProduction ? "" : "/api/rest"}`;

  graphqlApiUrl: string = `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}${this.isProduction ? "/s/graphql" : "/api/graphql"}`;

  get isProduction() {
    return process.env.NODE_ENV === "production";
  }
}
