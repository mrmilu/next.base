import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";
import { Post } from "@/src/core/posts/domain/models/post";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import css from "../../../users/views/users_page/users_page.css";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";

export interface PostsPageProps {
  serializedPosts: Array<Record<string, unknown>>;
}

export default function PostsPage({ serializedPosts }: PostsPageProps) {
  const { mdAndUp } = useBreakpointsMatch();
  const postDomain: Array<Post> = useMemo(
    () => serializedPosts.map((value: Record<string, unknown>) => new Post(value as ConstructorType<Post>)),
    [serializedPosts]
  );

  return (
    <div className={css.wrapper}>
      {mdAndUp && <h2>Posts SSR page</h2>}
      {postDomain.map((post, idx) => (
        <SimpleCard key={`${post.id}_${idx}`} title={post.title} subtitle={post.body} />
      ))}
    </div>
  );
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout logged={page.props.logged}>{page}</BaseLayout>;
};
