import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UsersPageWithProvider from "@/src/ui/features/users/views/users_page/users_page";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetUsersUseCase } from "@/src/core/users/domain/use_cases/get_users_use_case";
import { TYPES } from "@/src/core/app/ioc/types";

export default UsersPageWithProvider;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const getUser = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
  const users = await getUser.execute();
  return {
    props: {
      serializedUsers: JSON.parse(JSON.stringify(users)),
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    }
  };
};
