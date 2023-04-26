import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreatePostPage from "@/src/ui/features/posts/views/create_post_page/create_post_page";

export default CreatePostPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    }
  };
};
