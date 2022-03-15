import { DocumentNode } from "graphql";

export interface IGraphqlDataSource {
  mutate<T, V = any>(mutation: DocumentNode, variables?: V): Promise<T | null | undefined>;
  query<T, V = any>(query: DocumentNode, variables?: V): Promise<T | null | undefined>;
}
