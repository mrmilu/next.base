import { inject, injectable } from "inversify";
import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";
import { IocProvider } from "@/src/core/app/ioc/interfaces";
import { IDummyRepository } from "@/src/core/dummy/domain/interfaces/dummy_repository";
import { TYPES } from "@/src/core/app/ioc/types";

@injectable()
export class GetDummyUsersUseCase {
  @inject(TYPES.IDummyRepository) private readonly dummyRepositoryProvider!: IocProvider<IDummyRepository>;

  async execute(): Promise<Array<DummyUser>> {
    const dummyRepository = await this.dummyRepositoryProvider();
    return dummyRepository.users();
  }
}
