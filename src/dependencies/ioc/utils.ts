import { locator } from "@/src/dependencies/ioc/index";

export const bindDynamicModule = <P, T>(identifier: symbol, toResolveModule: () => Promise<any>) => {
  locator.bind<P>(identifier).toProvider<T>((context) => {
    return async () => {
      const repo = await toResolveModule();

      const resolvedIdentifier = `${identifier.toString()}_resolved`;
      if (!context.container.isBound(resolvedIdentifier)) {
        context.container.bind<T>(resolvedIdentifier).to(repo);
      }
      return context.container.get<T>(resolvedIdentifier);
    };
  });
};
