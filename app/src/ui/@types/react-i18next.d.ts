import type home from "../../../public/assets/locales/en/home.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "home";
    resources: {
      home: typeof home;
    };
  }
}
