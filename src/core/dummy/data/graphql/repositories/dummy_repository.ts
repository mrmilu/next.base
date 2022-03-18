import type { IDummyRepository } from "../../../domain/interfaces/dummy_repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";
import UsersQuery from "../queries/users.graphql";
import CreateDummyPostMutation from "../mutations/create_dummy_post.graphql";
import { Users } from "@/src/core/dummy/data/graphql/queries/__generated__/Users";
import { plainToClass } from "class-transformer";
import { MockService } from "@/src/core/app/data/services/mock_service";
import { DummyPost } from "@/src/core/dummy/domain/models/dummy_post";
import { CreateDummyPost } from "@/src/core/dummy/data/graphql/mutations/__generated__/CreateDummyPost";
import { CreatePostInput } from "../../../domain/interfaces/dummy_repository";

@injectable()
export class DummyRepository implements IDummyRepository {
  @inject(TYPES.MockService) private mockService!: MockService;

  async users(): Promise<Array<DummyUser>> {
    const response = await this.mockService.query<Users>(UsersQuery);
    return response?.users?.data?.map((user) => plainToClass(DummyUser, user)) ?? [];
  }

  async createPost(input: CreatePostInput): Promise<DummyPost | null> {
    const response = await this.mockService.mutate<CreateDummyPost>(CreateDummyPostMutation, { input });
    return response ? plainToClass(DummyPost, response.createPost) : null;
  }
}
