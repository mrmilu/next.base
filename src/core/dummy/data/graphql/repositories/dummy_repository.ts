import type { IDummyRepository } from "../../../domain/interfaces/dummy_repository";
import type { HttpClient } from "@/src/dependencies/network/http_client";
import { inject, injectable } from "inversify";
import { TYPES } from "@/src/dependencies/ioc/types";
import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";
import UsersQuery from "../queries/users.graphql";
import { plainToClass } from "class-transformer";
import { Users } from "@/src/core/dummy/data/graphql/queries/__generated__/Users";

@injectable()
export class DummyRepository implements IDummyRepository {
  @inject(TYPES.IHttpClient) private httpClient!: HttpClient;

  async users(): Promise<Array<DummyUser>> {
    const response = await this.httpClient.query<Users>(UsersQuery);
    return response?.users?.map((user) => plainToClass(DummyUser, user)) ?? [];
  }
}
