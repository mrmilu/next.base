import css from "../users_page/users_page.css";
import { locator } from "@/src/core/app/ioc/__generated__";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetUsersUseCase } from "@/src/core/users/domain/use_cases/get_users_use_case";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import UserRow from "@/src/ui/features/users/views/users_page/components/user_row";
import PageTitle from "@/src/ui/features/users/views/users_page/components/page_title";
import { instanceToPlain } from "class-transformer";

export default async function UsersPage() {
  const getUser = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
  const users = await getUser.execute();

  return (
    <div className={css.wrapper}>
      <PageTitle />
      {users.map((user, idx) => (
        <UserRow key={`${user.id}_${idx}`} user={instanceToPlain(user)} />
      ))}
    </div>
  );
}
