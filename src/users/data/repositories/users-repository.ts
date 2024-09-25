import { TYPES } from "@/src/shared/application/ioc/__generated__/types";
import { inject, injectable } from "inversify";
import type { User } from "@/src/users/domain/models/user";
import { plainToClass } from "class-transformer";
import type { IocProvider } from "@/src/shared/application/ioc/interfaces";
import { UserDTO } from "@/src/users/data/dtos/user";
import type { IUsersRepository } from "@/src/users/domain/interfaces/users-repository";
import type { RestService } from "@/src/shared/data/services/rest-service";

@injectable()
export class UsersRepository implements IUsersRepository {
  @inject(TYPES.RestService) private restServiceProvider!: IocProvider<RestService>;

  async users(): Promise<Array<User>> {
    const restService = await this.restServiceProvider();
    const response = await restService.get<Array<Record<string, unknown>>>("/users");
    return (
      response.map((user) => {
        const dataModel = plainToClass(UserDTO, user, { excludeExtraneousValues: true });
        return dataModel.toDomain();
      }) ?? []
    );
  }
}
