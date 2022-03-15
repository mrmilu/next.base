import { DocumentNode } from "graphql";
import { ApolloClient, FetchPolicy, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { MutationFetchPolicy } from "@apollo/client/core/watchQueryOptions";
import { PossibleTypesMap } from "@apollo/client/cache/inmemory/policies";

type DataWithError<T> = T & { errors?: Array<string> };
export type QueryOptions = { fetchPolicy?: FetchPolicy; headers: Record<string, any> };
export type MutationOptions = { fetchPolicy?: MutationFetchPolicy; headers: Record<string, any> };

export class GraphqlClient {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(uri: string, possibleTypes?: PossibleTypesMap) {
    this.client = new ApolloClient({
      cache: new InMemoryCache({ possibleTypes }),
      uri: uri,
      queryDeduplication: false,
      ssrMode: true,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "no-cache",
          errorPolicy: "ignore"
        },
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "all"
        },
        mutate: {
          errorPolicy: "all"
        }
      }
    });
  }

  async mutate<T, V = any>(mutation: DocumentNode, variables?: V, options?: MutationOptions): Promise<T | null | undefined> {
    try {
      const { data, errors } = await this.client.mutate<T>({
        mutation,
        variables,
        fetchPolicy: options?.fetchPolicy,
        context: { headers: options?.headers ?? {} }
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

  async query<T, V = any>(query: DocumentNode, variables?: V, options?: QueryOptions): Promise<T | null | undefined> {
    try {
      const { data, errors } = await this.client.query<T>({
        query,
        variables,
        fetchPolicy: options?.fetchPolicy,
        context: { headers: options?.headers ?? {} }
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
