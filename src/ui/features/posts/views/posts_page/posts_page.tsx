import css from "../../../users/views/users_page/users_page.css";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";
import { locator } from "@/src/core/app/ioc/__generated__";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetPostsUseCase } from "@/src/core/posts/domain/use_cases/get_posts_use_case";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import PageTitle from "@/src/ui/features/posts/views/posts_page/components/page_title";
import type { Post } from "@/src/core/posts/domain/models/post";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

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
