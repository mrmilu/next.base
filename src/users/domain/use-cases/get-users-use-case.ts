import { inject, injectable } from "inversify";
import type { User } from "@/src/users/domain/models/user";
import type { IocProvider } from "@/src/shared/ioc/interfaces";
import { TYPES } from "@/src/shared/ioc/__generated__/types";
import type { IUsersRepository } from "@/src/users/domain/interfaces/users-repository";

@injectable()
export class GetUsersUseCase {
  @inject(TYPES.IUsersRepository) private readonly usersRepositoryProvider!: IocProvider<IUsersRepository>;

  async execute(): Promise<Array<User>> {
    const repository = await this.usersRepositoryProvider();
    return repository.users();
  }
}
