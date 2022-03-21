import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import type { IEnvVars } from "../domain/interfaces/env_vars";
import { EnvVars } from "../domain/models/env_vars";
import type { IDummyRepository } from "@/src/core/dummy/domain/interfaces/dummy_repository";
import { bindDynamicModule } from "@/src/core/app/ioc/utils";
import { MockService } from "@/src/core/app/data/services/mock_service";
import type { IGraphqlDataSource } from "@/src/common/interfaces/graphql_data_source";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetDummyUsersUseCase } from "@/src/core/dummy/domain/use_cases/get_dummy_users_use_case";
import type { CreateDummyPostUseCase } from "@/src/core/dummy/domain/use_cases/create_dummy_post_use_case";

const locator = new Container();
locator.bind<IEnvVars>(TYPES.IEnvVars).to(EnvVars);
locator.bind<IGraphqlDataSource>(TYPES.MockService).to(MockService);

// Repositories
bindDynamicModule<IocProvider<IDummyRepository>, IDummyRepository>(TYPES.IDummyRepository, () =>
  import("../../dummy/data/graphql/repositories/dummy_repository").then((module) => module.DummyRepository)
);

// Use cases
bindDynamicModule<IocProvider<GetDummyUsersUseCase>, GetDummyUsersUseCase>(TYPES.GetDummyUsersUseCase, () =>
  import("../../dummy/domain/use_cases/get_dummy_users_use_case").then((module) => module.GetDummyUsersUseCase)
);
bindDynamicModule<IocProvider<CreateDummyPostUseCase>, CreateDummyPostUseCase>(TYPES.CreteDummyPostUseCase, () =>
  import("../../dummy/domain/use_cases/create_dummy_post_use_case").then((module) => module.CreateDummyPostUseCase)
);

export { locator };
