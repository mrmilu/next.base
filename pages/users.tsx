import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { locator } from "@/src/core/app/ioc/__generated__";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import type { GetUsersUseCase } from "@/src/core/users/domain/use_cases/get_users_use_case";
import UsersPage from "@/src/ui/features/users/views/users_ssr_page/users_ssr_page";

export default UsersPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  console.log("REVALIDATING USERS");
  const getUser = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
  const users = await getUser.execute();
  return {
    props: {
      serializedUsers: JSON.parse(JSON.stringify(users)),
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    },
    revalidate: 5
  };
};
