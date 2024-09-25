import { inject, injectable } from "inversify";
import type { IocProvider } from "@/src/shared/application/ioc/interfaces";
import { TYPES } from "@/src/shared/application/ioc/__generated__/types";
import type { IPostsRepository } from "@/src/posts/domain/interfaces/posts-repository";
import type { Post } from "@/src/posts/domain/models/post";

@injectable()
export class GetPostsUseCase {
  @inject(TYPES.IPostsRepository) private readonly postsRepositoryProvider!: IocProvider<IPostsRepository>;

  async execute(): Promise<Array<Post>> {
    const repository = await this.postsRepositoryProvider();
    const pagePosts = await repository.posts();
    return pagePosts.items;
  }
}
