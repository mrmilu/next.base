import { DocumentNode } from "graphql";
import { ApolloClient, FetchPolicy, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { inject, injectable } from "inversify";
import { IEnvVars } from "../../core/common/domain/interfaces/env_vars";
import { TYPES } from "@/src/dependencies/ioc/types";

type DataWithError<T> = T & { errors?: Array<string> };

@injectable()
export class HttpClient {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(@inject(TYPES.IEnvVars) envVars: IEnvVars) {
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: envVars.serverUrl,
      queryDeduplication: false,
      ssrMode: true,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "cache-and-network",
          errorPolicy: "ignore"
        },
        query: {
          fetchPolicy: "network-only",
          errorPolicy: "all"
        },
        mutate: {
          errorPolicy: "all"
        }
      }
    });
  }

  async mutate<T, V = any>(mutation: DocumentNode, variables?: V): Promise<T | null | undefined> {
    try {
      const { data, errors } = await this.client.mutate<T>({
        mutation,
        variables
      });
      const castedData: DataWithError<T> | null | undefined = data;
      const hasError = errors && errors.length;
      const hasDataError = castedData?.errors && castedData.errors.length;
      if (hasError) {
        throw new Error(errors[0].message);
      } else if (hasDataError) {
        throw new Error(castedData.errors![0]);
      }
      return data;
    } catch (e) {
      throw e;
    }
  }

  async query<T, V = any>(query: DocumentNode, variables?: V, fetchPolicy?: FetchPolicy): Promise<T | null | undefined> {
    try {
      const { data, errors } = await this.client.query<T>({
        query,
        variables,
        fetchPolicy
      });
      const castedData: DataWithError<T> = data;
      const hasError = errors && errors.length;
      const hasDataError = castedData.errors && castedData.errors.length;
      if (hasError) {
        throw new Error(errors[0].message);
      } else if (hasDataError) {
        throw new Error(castedData.errors![0]);
      }
      return data;
    } catch (e) {
      throw e;
    }
  }
}
