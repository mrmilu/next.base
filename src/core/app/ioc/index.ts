import "reflect-metadata";
import { Container } from "inversify";
import type { IEnvVars } from "@/src/core/app/domain/interfaces/env_vars";
import { TYPES } from "./types";
import { EnvVars } from "@/src/core/app/domain/models/env_vars";
import type { JSONPlaceholderService } from "@/src/core/app/data/services/json_placeholder_service";
import { bindDynamicModule, decorateDep } from "./utils";
import type { IocProvider } from "./interfaces";
import type { GetDummyPostsUseCase } from "../../dummy/domain/use_cases/get_dummy_posts_use_case";
import type { CreateDummyPostUseCase } from "../../dummy/domain/use_cases/create_dummy_post_use_case";
import type { GetDummyUsersUseCase } from "../../dummy/domain/use_cases/get_dummy_users_use_case";
import type { IDummyRepository } from "@/src/core/dummy/domain/interfaces/dummy_repository";
import type { MockService } from "@/src/core/app/data/services/mock_service";
import { TagManagerService } from "@front_web_mrmilu/services";
import type { NetworkInterfaces } from "@front_web_mrmilu/network";

// Third party deps
decorateDep(TagManagerService);

const locator = new Container();
locator.bind<IEnvVars>(TYPES.IEnvVars).to(EnvVars);
locator.bind<TagManagerService>(TYPES.TagManagerService).to(TagManagerService).inSingletonScope();
bindDynamicModule<IocProvider<NetworkInterfaces.IGraphqlDataSource>, MockService>(TYPES.MockService, () =>
  import("../data/services/mock_service").then((module) => module.MockService)
);
bindDynamicModule<IocProvider<NetworkInterfaces.IRestDataSource>, JSONPlaceholderService>(TYPES.JSONPlaceholderService, () =>
  import("../data/services/json_placeholder_service").then((module) => module.JSONPlaceholderService)
);

// Repositories
bindDynamicModule<IocProvider<IDummyRepository>, IDummyRepository>(TYPES.IDummyRepository, () =>
  import("../../dummy/data/repositories/dummy_repository").then((module) => module.DummyRepository)
);

// Use cases
bindDynamicModule<IocProvider<GetDummyUsersUseCase>, GetDummyUsersUseCase>(TYPES.GetDummyUsersUseCase, () =>
  import("../../dummy/domain/use_cases/get_dummy_users_use_case").then((module) => module.GetDummyUsersUseCase)
);
bindDynamicModule<IocProvider<CreateDummyPostUseCase>, CreateDummyPostUseCase>(TYPES.CreteDummyPostUseCase, () =>
  import("../../dummy/domain/use_cases/create_dummy_post_use_case").then((module) => module.CreateDummyPostUseCase)
);
bindDynamicModule<IocProvider<GetDummyPostsUseCase>, GetDummyPostsUseCase>(TYPES.GetDummyPostsUseCase, () =>
  import("../../dummy/domain/use_cases/get_dummy_posts_use_case").then((module) => module.GetDummyPostsUseCase)
);

export { locator };
