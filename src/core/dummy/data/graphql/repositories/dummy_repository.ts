import type { IDummyRepository } from "../../../domain/interfaces/dummy_repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";
import UsersQuery from "../queries/users.graphql";
import { Users } from "@/src/core/dummy/data/graphql/queries/__generated__/Users";
import { plainToClass } from "class-transformer";
import { MockService } from "@/src/core/app/data/services/mock_service";

@injectable()
export class DummyRepository implements IDummyRepository {
  @inject(TYPES.MockIoService) private mockIoService!: MockService;

  async users(): Promise<Array<DummyUser>> {
    const response = await this.mockIoService.query<Users>(UsersQuery);
    return response?.users?.data?.map((user) => plainToClass(DummyUser, user)) ?? [];
  }
}
