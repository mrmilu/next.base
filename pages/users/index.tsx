import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UsersPage from "@/src/ui/features/users/views/users_page/users_page";

export default UsersPage;

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
