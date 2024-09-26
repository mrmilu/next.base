import { inject, injectable } from "inversify";
import { HttpClient } from "@/src/shared/data/network/rest/http-client";
import type { IEnvVars } from "@/src/shared/domain/interfaces/env-vars";
import { TYPES } from "@/src/shared/ioc/__generated__/types";
import type {
  IRestDataSource,
  RestDataSourceOptionsWithParams,
  RestDataSourceOptionsWithData
} from "@/src/shared/domain/interfaces/rest-data-source";
import { generatorConf } from "inversify-generator/decorators";

@injectable()
@generatorConf({ typeName: "RestService" })
export class RestService implements IRestDataSource {
  private readonly httpClient: HttpClient;

  constructor(@inject(TYPES.IEnvVars) envVars: IEnvVars) {
    this.httpClient = new HttpClient(`${envVars.apiUrl}`);
  }

  async get<T = unknown>(url: string, options: RestDataSourceOptionsWithParams = {}): Promise<T> {
    const res = await this.httpClient.get<T>(url, options);
    return res.data;
  }
  async post<T = unknown, D = unknown>(url: string, options: RestDataSourceOptionsWithData<D> = {}): Promise<T> {
    const res = await this.httpClient.post<T, D>(url, options);
    return res.data;
  }
}
