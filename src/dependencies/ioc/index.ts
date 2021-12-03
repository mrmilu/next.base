import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IEnvVars } from "../../core/common/domain/interfaces/env_vars";
import { EnvVars } from "../../core/common/domain/models/env_vars";
import { HttpClient } from "../network/http_client";
import { DummyRepositoryProvider, IDummyRepository } from "@/src/core/dummy/domain/interfaces/dummy_repository";
import { bindDynamicModule } from "@/src/dependencies/ioc/utils";

const locator = new Container();
locator.bind<IEnvVars>(TYPES.IEnvVars).to(EnvVars);
locator.bind<HttpClient>(TYPES.IHttpClient).to(HttpClient);
bindDynamicModule<DummyRepositoryProvider, IDummyRepository>(TYPES.IDummyRepository, () =>
  import("../../core/dummy/data/graphql/repositories/dummy_repository").then((module) => module.DummyRepository)
);

export { locator };
