import { TYPES } from "@/src/core/app/ioc/__generated__/types";
import { inject, injectable } from "inversify";
import type { User } from "@/src/core/users/domain/models/user";
import { plainToClass } from "class-transformer";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { UserDataModel } from "@/src/core/users/data/models/user-data-model";
import type { IUsersRepository } from "@/src/core/users/domain/interfaces/users-repository";
import type { RestService } from "@/src/core/app/data/services/rest-service";

@injectable()
export class UsersRepository implements IUsersRepository {
  @inject(TYPES.RestService) private restServiceProvider!: IocProvider<RestService>;

  async users(): Promise<Array<User>> {
    const restService = await this.restServiceProvider();
    const response = await restService.get<Array<Record<string, unknown>>>("/users");
    return (
      response.map((user) => {
        const dataModel = plainToClass(UserDataModel, user, { excludeExtraneousValues: true });
        return dataModel.toDomain();
      }) ?? []
    );
  }
}
