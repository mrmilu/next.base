import { IEnvVars } from "../interfaces/env_vars";
import { injectable } from "inversify";

@injectable()
export class EnvVars implements IEnvVars {
  serverUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/s/graphql/` || "localhost:3000/s/graphql/";
}
