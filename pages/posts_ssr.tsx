import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { instanceToPlain } from "class-transformer";
import PostsSSRPage from "@/src/ui/features/dummy/components/posts_ssr_page/posts_ssr_page";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetDummyPostsUseCase } from "@/src/core/dummy/domain/use_cases/get_dummy_posts_use_case";
import { TYPES } from "@/src/core/app/ioc/types";

export default PostsSSRPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const getDummyPostsUseCase = await locator.get<IocProvider<GetDummyPostsUseCase>>(TYPES.GetDummyPostsUseCase)();
  const dummyPosts = await getDummyPostsUseCase.execute();

  return {
    props: {
      serializedPosts: JSON.stringify(instanceToPlain(dummyPosts)),
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    }
  };
};
