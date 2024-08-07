import type { IPostsRepository } from "../../domain/interfaces/posts-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import type { Post } from "@/src/core/posts/domain/models/post";
import type { RestService } from "@/src/core/app/data/services/rest-service";
import { PostDataModel } from "@/src/core/posts/data/models/post-data-model";
import { fromJson, fromJsonPage } from "@/src/common/utils/class-transformer";
import type { Page } from "@/src/core/app/domain/models/page";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { CreatePostInputModel } from "../../domain/models/create-post-input-model";

@injectable()
export class PostsRepository implements IPostsRepository {
  @inject(TYPES.RestService) private restServiceProvider!: IocProvider<RestService>;

  async createPost(input: CreatePostInputModel): Promise<Post | null> {
    const restService = await this.restServiceProvider();
    const { id } = await restService.post<Record<string, unknown>>("/posts", {
      data: {
        title: input.title,
        body: input.body,
        userId: 1
      }
    });
    return fromJson<PostDataModel>(PostDataModel, {
      id,
      title: input.title,
      body: input.body,
      userId: 1
    }).toDomain();
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
