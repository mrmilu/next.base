import css from "@/src/common/presentation/styles/wrapper.css";
import { locator } from "@/src/core/app/ioc/__generated__";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetUsersUseCase } from "@/src/users/domain/use-cases/get-users-use-case";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import UsersList from "@/src/users/presentation/containers/users-list";
import { instanceToPlain } from "class-transformer";
import type { User } from "@/src/users/domain/models/user";
import UsersListProvider from "@/src/users/application/providers/user-list-provider";
import PageTitle from "@/src/common/presentation/components/page-title";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function UsersProviderPage() {
  let users: Array<User> = [];
  let t: Awaited<ReturnType<typeof getTranslations<"users">>>;

  try {
    const getUser = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
    [users, t] = await Promise.all([getUser.execute(), getTranslations("users")]);
  } catch (e) {
    notFound();
  }

  return (
    <UsersListProvider users={instanceToPlain<User>(users)}>
      <div className={css.wrapper}>
        <PageTitle title={t("withProviderTitle")} />

        <UsersList />
      </div>
    </UsersListProvider>
  );
}
