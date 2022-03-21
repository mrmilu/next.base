import DummySSRPage from "@/src/ui/features/dummy/components/dummy_ssr_page/dummy_ssr_page";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetDummyUsersUseCase } from "@/src/core/dummy/domain/use_cases/get_dummy_users_use_case";
import { TYPES } from "@/src/core/app/ioc/types";
import { instanceToPlain } from "class-transformer";

export default DummySSRPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const getDummyUsersUseCase = await locator.get<IocProvider<GetDummyUsersUseCase>>(TYPES.GetDummyUsersUseCase)();
  const dummyUsers = await getDummyUsersUseCase.execute();
  return {
    props: {
      serializedUsers: JSON.stringify(instanceToPlain(dummyUsers)),
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    }
  };
};
