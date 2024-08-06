import css from "./users-page.css";
import { locator } from "@/src/core/app/ioc/__generated__";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetUsersUseCase } from "@/src/core/users/domain/use-cases/get-users-use-case";
import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import UsersList from "@/src/ui/features/users/views/users-page/containers/users-list";
import UsersProviderWrapper from "@/src/ui/features/users/views/users-page/users-provider-wrapper";
import { instanceToPlain } from "class-transformer";
import type { User } from "@/src/core/users/domain/models/user";

export default async function UsersProviderPage() {
  const getUser = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
  const users = await getUser.execute();

  return (
    <UsersProviderWrapper users={instanceToPlain<User>(users)}>
      <div className={css.wrapper}>
        <h1>Users page</h1>
        <UsersList />
      </div>
    </UsersProviderWrapper>
  );
}
