import css from "@/src/shared/presentation/styles/wrapper.css";
import { SimpleCard } from "@/src/shared/presentation/components/simple-card/simple-card";
import { locator } from "@/src/shared/ioc/__generated__";
import type { IocProvider } from "@/src/shared/ioc/interfaces";
import type { GetPostsUseCase } from "@/src/posts/application/use-cases/get-posts-use-case";
import { TYPES } from "@/src/shared/ioc/__generated__/types";
import type { Post } from "@/src/posts/domain/models/post";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import PageTitle from "@/src/shared/presentation/components/page-title/page-title";

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
      <PageTitle title={t("title")} subtitle={t("subtitle")} />
      {posts.map((post, idx) => (
        <SimpleCard key={`${post.id}_${idx}`} title={post.title} subtitle={post.body} />
      ))}
    </div>
  );
}
