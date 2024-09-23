import css from "@/src/common/presentation/styles/wrapper.css";
import { SimpleCard } from "@/src/ui/components/simple-card/simple-card";
import { locator } from "@/src/core/app/ioc/__generated__";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetPostsUseCase } from "@/src/posts/domain/use-cases/get-posts-use-case";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import type { Post } from "@/src/posts/domain/models/post";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import PostsPageTitle from "@/src/posts/presentation/components/posts-page-title";

export default async function PostsPage() {
  let posts: Array<Post> = [];
  let t: Awaited<ReturnType<typeof getTranslations<"posts">>>;
  try {
    const getPostsUseCase = await locator.get<IocProvider<GetPostsUseCase>>(TYPES.GetPostsUseCase)();
    [posts, t] = await Promise.all([getPostsUseCase.execute(), getTranslations("posts")]);
  } catch (e) {
    notFound();
  }

  return (
    <div className={css.wrapper}>
      <PostsPageTitle title={t("title")} subtitle={t("subtitle")} />
      {posts.map((post, idx) => (
        <SimpleCard key={`${post.id}_${idx}`} title={post.title} subtitle={post.body} />
      ))}
    </div>
  );
}
