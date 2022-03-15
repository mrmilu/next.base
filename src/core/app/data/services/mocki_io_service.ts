import { inject, injectable } from "inversify";
import { IGraphqlDataSource } from "@/src/common/interfaces/graphql_data_source";
import { DocumentNode } from "graphql";
import { IEnvVars } from "@/src/core/app/domain/interfaces/env_vars";
import { TYPES } from "../../ioc/types";
import possibleTypes from "./mocki_io_service_possible_types.json";
import { GraphqlClient } from "@/src/common/network/graphql_client";

@injectable()
export class MockiIoService implements IGraphqlDataSource {
  private graphqlClient: GraphqlClient;

  constructor(@inject(TYPES.IEnvVars) envVars: IEnvVars) {
    this.graphqlClient = new GraphqlClient(envVars.serverUrl, possibleTypes);
  }

  mutate<T, V = any>(mutation: DocumentNode, variables?: V): Promise<T | null | undefined> {
    return this.graphqlClient.mutate<T, V>(mutation, variables);
  }

  query<T, V = any>(query: DocumentNode, variables?: V): Promise<T | null | undefined> {
    return this.graphqlClient.query<T, V>(query, variables);
  }
}
