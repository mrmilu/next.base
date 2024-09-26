import css from "@/src/shared/presentation/styles/wrapper.css";
import { locator } from "@/src/shared/ioc/__generated__";
import type { IocProvider } from "@/src/shared/ioc/interfaces";
import type { GetUsersUseCase } from "@/src/users/application/use-cases/get-users-use-case";
import { TYPES } from "@/src/shared/ioc/__generated__/types";
import UserRow from "@/src/users/presentation/components/user-row";
import PageTitle from "@/src/shared/presentation/components/page-title/page-title";
import { instanceToPlain } from "class-transformer";
import type { User } from "@/src/users/domain/models/user";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function UsersPage() {
  let users: Array<User> = [];
  let t: Awaited<ReturnType<typeof getTranslations<"users">>>;

  try {
    const getUser = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
    [users, t] = await Promise.all([getUser.execute(), getTranslations("users")]);
  } catch (e) {
    notFound();
  }

  return (
    <div className={css.wrapper}>
      <PageTitle title={t("title")} />

      {users.map((user, idx) => (
        <UserRow key={`${user.id}_${idx}`} user={instanceToPlain(user)} />
      ))}
    </div>
  );
}
