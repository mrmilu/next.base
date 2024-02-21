import type { IPostsRepository } from "../../domain/interfaces/posts_repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import CreatePostMutationOperation from "../graphql/mutations/create_post.graphql";
import type { GraphqlService } from "@/src/core/app/data/services/graphql_service";
import type { CreatePostInput } from "@/src/__generated__/graphql";
import type { Post } from "@/src/core/posts/domain/models/post";
import type { RestService } from "@/src/core/app/data/services/rest_service";
import { PostDataModel } from "@/src/core/posts/data/models/post_data_model";
import { fromJson, fromJsonPage } from "@/src/common/utils/class_transformer";
import type { Page } from "@/src/core/app/domain/models/page";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { CreatePostMutation } from "@/src/core/posts/data/graphql/mutations/__generated__/create_post";

@injectable()
export class PostsRepository implements IPostsRepository {
  @inject(TYPES.GraphqlService) private graphqlServiceProvider!: IocProvider<GraphqlService>;
  @inject(TYPES.RestService) private restServiceProvider!: IocProvider<RestService>;

  async createPost(input: CreatePostInput): Promise<Post | null> {
    const graphqlService = await this.graphqlServiceProvider();
    const response = await graphqlService.mutate<CreatePostMutation>(CreatePostMutationOperation, { input });
    return response?.createPost ? fromJson<PostDataModel>(PostDataModel, response.createPost).toDomain() : null;
  }

  async posts(): Promise<Page<Post>> {
    const resetService = await this.restServiceProvider();
    const dataPostList = await resetService.get<Array<Record<string, unknown>>>("/posts");
    const fakePage = {
      results: dataPostList,
      totalCount: dataPostList.length,
      page: 1
    };
    return fromJsonPage<PostDataModel, Post>(PostDataModel, fakePage).toDomain();
  }
}
