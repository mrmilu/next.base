import DummyPage from "@/src/ui/features/dummy/components/dummy_page/dummy_page";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default DummyPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const fakeTimeout = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 400));
  await fakeTimeout();
  return {
    props: {
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    }
  };
};
