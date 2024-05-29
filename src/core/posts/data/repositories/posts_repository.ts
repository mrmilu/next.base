import type { IPostsRepository } from "../../domain/interfaces/posts_repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import type { Post } from "@/src/core/posts/domain/models/post";
import type { RestService } from "@/src/core/app/data/services/rest_service";
import { PostDataModel } from "@/src/core/posts/data/models/post_data_model";
import { fromJson, fromJsonPage } from "@/src/common/utils/class_transformer";
import type { Page } from "@/src/core/app/domain/models/page";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { CreatePostInputModel } from "../../domain/models/create_post_input_model";

@injectable()
export class PostsRepository implements IPostsRepository {
  @inject(TYPES.RestService) private restServiceProvider!: IocProvider<RestService>;

  async createPost(input: CreatePostInputModel): Promise<Post | null> {
    console.log({ createPostInput: input });
    const restService = await this.restServiceProvider();
    const createdPost = await restService.get<Record<string, unknown>>("/posts/1");
    return fromJson<PostDataModel>(PostDataModel, createdPost).toDomain();
  }

  async posts(): Promise<Page<Post>> {
    const restService = await this.restServiceProvider();
    const dataPostList = await restService.get<Array<Record<string, unknown>>>("/posts");
    const fakePage = {
      results: dataPostList,
      totalCount: dataPostList.length,
      page: 1
    };
    return fromJsonPage<PostDataModel, Post>(PostDataModel, fakePage).toDomain();
  }
}
