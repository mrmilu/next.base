import { Expose } from "class-transformer";
import type { DataModel } from "@/src/common/interfaces/data-model";
import { Post } from "@/src/posts/domain/models/post";

export class PostDTO implements DataModel<Post> {
  @Expose()
  id!: string;
  @Expose()
  title!: string;
  @Expose()
  body!: string;
  @Expose()
  userId!: string;

  toDomain() {
    return new Post({
      id: this.id,
      title: this.title,
      body: this.body
    });
  }
}