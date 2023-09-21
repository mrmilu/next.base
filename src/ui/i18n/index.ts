import type { KeyPrefix, Namespace, i18n } from "i18next";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng: string, ns: Namespace | undefined) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function serverSideTranslation(
  lng: string,
  ns: Namespace | undefined,
  options?: { keyPrefix: KeyPrefix<Namespace> }
): Promise<{ t: i18n["t"]; i18n: i18n }> {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns, options?.keyPrefix),
    i18n: i18nextInstance
  };
}
