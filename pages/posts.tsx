import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { GetPostsUseCase } from "@/src/core/posts/domain/use_cases/get_posts_use_case";
import PostsPage from "@/src/ui/features/posts/views/posts_ssr_page/posts_ssr_page";

export default PostsPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  console.log("REVALIDATING POSTS");
  const getPostsUseCase = await locator.get<IocProvider<GetPostsUseCase>>(TYPES.GetPostsUseCase)();
  const posts = await getPostsUseCase.execute();

  return {
    props: {
      serializedPosts: JSON.parse(JSON.stringify(posts)),
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    },
    revalidate: 5
  };
};
