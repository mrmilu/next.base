import { inject, injectable } from "inversify";
import { HttpClient } from "@/src/common/network/rest/http_client";
import type { IEnvVars } from "@/src/core/app/domain/interfaces/env_vars";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import type { IRestDataSource, RestDataSourceOptions } from "@/src/common/interfaces/rest_data_source";
import { generatorConf } from "inversify-generator/decorators";

@injectable()
@generatorConf({ typeName: "RestService" })
export class RestService implements IRestDataSource {
  private readonly httpClient: HttpClient;

  constructor(@inject(TYPES.IEnvVars) envVars: IEnvVars) {
    this.httpClient = new HttpClient(`${envVars.apiUrl}`);
  }

  async get<T = unknown>(url: string, { params }: RestDataSourceOptions = {}): Promise<T> {
    const res = await this.httpClient.get<T>(url, {
      params
    });
    return res.data;
  }
}
