import HomePage from "@/src/ui/features/home/components/home_page/home_page";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    }
  };
};
