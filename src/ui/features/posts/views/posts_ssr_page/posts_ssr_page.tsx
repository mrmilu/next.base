import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import Styled from "../../../users/views/users_page/users_page.styled";
import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";
import { plainToClass } from "class-transformer";
import { Post } from "@/src/core/posts/domain/models/post";

export interface PostsSSRPageProps {
  serializedPosts: string;
}

export default function PostsSSRPage({ serializedPosts }: PostsSSRPageProps) {
  const { mdAndUp } = useBreakpointsMatch();
  const postDomain: Array<Post> = useMemo(
    () => JSON.parse(serializedPosts).map((value: Record<string, unknown>) => plainToClass(Post, value, { excludeExtraneousValues: true })),
    [serializedPosts]
  );

  return (
    <Styled.Wrapper>
      {mdAndUp && <h2>Posts SSR page</h2>}
      {postDomain.map((post, idx) => (
        <Styled.SimpleCard key={`${post.id}_${idx}`} title={post.title} subtitle={post.body} />
      ))}
    </Styled.Wrapper>
  );
}

PostsSSRPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout logged={page.props.logged}>{page}</BaseLayout>;
};
