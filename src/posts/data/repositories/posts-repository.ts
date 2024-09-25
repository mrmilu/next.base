import type { IPostsRepository } from "../../domain/interfaces/posts-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@/src/shared/application/ioc/__generated__/types";
import type { Post } from "@/src/posts/domain/models/post";
import type { RestService } from "@/src/shared/data/services/rest-service";
import { PostDTO } from "@/src/posts/data/dtos/post";
import { fromJson, fromJsonPage } from "@/src/shared/utils/class-transformer";
import type { Page } from "@/src/shared/domain/models/page";
import type { IocProvider } from "@/src/shared/application/ioc/interfaces";
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
    return fromJson<PostDTO>(PostDTO, {
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
    return fromJsonPage<PostDTO, Post>(PostDTO, fakePage).toDomain();
  }
}
