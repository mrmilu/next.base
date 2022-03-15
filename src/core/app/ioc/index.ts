import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IEnvVars } from "../domain/interfaces/env_vars";
import { EnvVars } from "../domain/models/env_vars";
import { DummyRepositoryProvider, IDummyRepository } from "@/src/core/dummy/domain/interfaces/dummy_repository";
import { bindDynamicModule } from "@/src/core/app/ioc/utils";
import { MockiIoService } from "@/src/core/app/data/services/mocki_io_service";
import { IGraphqlDataSource } from "@/src/common/interfaces/graphql_data_source";

const locator = new Container();
locator.bind<IEnvVars>(TYPES.IEnvVars).to(EnvVars);
locator.bind<IGraphqlDataSource>(TYPES.MockIoService).to(MockiIoService);

bindDynamicModule<DummyRepositoryProvider, IDummyRepository>(TYPES.IDummyRepository, () =>
  import("../../dummy/data/graphql/repositories/dummy_repository").then((module) => module.DummyRepository)
);

export { locator };
