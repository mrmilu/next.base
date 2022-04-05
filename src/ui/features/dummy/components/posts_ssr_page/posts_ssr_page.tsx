import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { DummyPageSimpleCardStyled, DummyPageStyled } from "@/src/ui/features/dummy/components/dummy_page/dummy_page.styled";
import { useBreakpointsMatch } from "@/src/ui/hooks/breakpoint_match.hook";
import { plainToClass } from "class-transformer";
import { DummyPost } from "@/src/core/dummy/domain/models/dummy_post";

export interface PostsSSRPageProps {
  serializedPosts: string;
}

export default function PostsSSRPage({ serializedPosts }: PostsSSRPageProps) {
  const { mdAndUp } = useBreakpointsMatch();
  const postDomain: Array<DummyPost> = useMemo(
    () => JSON.parse(serializedPosts).map((value: Record<string, unknown>) => plainToClass(DummyPost, value, { excludeExtraneousValues: true })),
    [serializedPosts]
  );

  return (
    <DummyPageStyled>
      {mdAndUp && <h2>Posts SSR page</h2>}
      {postDomain.map((post, idx) => (
        <DummyPageSimpleCardStyled key={`${post.id}_${idx}`} title={post.title} subtitle={post.body} />
      ))}
    </DummyPageStyled>
  );
}

PostsSSRPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
