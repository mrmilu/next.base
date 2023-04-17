import DummySSRPage from "@/src/ui/features/dummy/components/dummy_ssr_page/dummy_ssr_page";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { GetUsersUseCase } from "@/src/core/users/domain/use_cases/get_users_use_case";

export default DummySSRPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  console.log("REVALIDATING DUMMY");
  const getUser = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
  const users = await getUser.execute();
  return {
    props: {
      serializedUsers: JSON.stringify(users),
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    },
    revalidate: 5
  };
};
