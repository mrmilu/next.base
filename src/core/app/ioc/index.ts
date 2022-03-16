import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IEnvVars } from "../domain/interfaces/env_vars";
import { EnvVars } from "../domain/models/env_vars";
import { IDummyRepository } from "@/src/core/dummy/domain/interfaces/dummy_repository";
import { bindDynamicModule } from "@/src/core/app/ioc/utils";
import { MockService } from "@/src/core/app/data/services/mock_service";
import { IGraphqlDataSource } from "@/src/common/interfaces/graphql_data_source";
import type { GetDummyUsersUseCase } from "@/src/core/dummy/domain/use_cases/get_dummy_users_use_case";
import { IocProvider } from "@/src/core/app/ioc/interfaces";

const locator = new Container();
locator.bind<IEnvVars>(TYPES.IEnvVars).to(EnvVars);
locator.bind<IGraphqlDataSource>(TYPES.MockIoService).to(MockService);

// Repositories
bindDynamicModule<IocProvider<IDummyRepository>, IDummyRepository>(TYPES.IDummyRepository, () =>
  import("../../dummy/data/graphql/repositories/dummy_repository").then((module) => module.DummyRepository)
);

// Use cases
bindDynamicModule<IocProvider<GetDummyUsersUseCase>, IDummyRepository>(TYPES.GetDummyUsersUseCase, () =>
  import("../../dummy/domain/use_cases/get_dummy_users_use_case").then((module) => module.GetDummyUsersUseCase)
);

export { locator };
