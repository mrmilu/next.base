import type { Namespace } from "i18next";

export const fallbackLng = "es-ES";
export const languages = ["en-GB", fallbackLng];
export const defaultNS: Namespace = "home";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns: Namespace = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}
