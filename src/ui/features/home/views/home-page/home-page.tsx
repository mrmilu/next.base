import css from "./home-page.css";
import LanguageSwitcher from "@/src/ui/features/home/views/home-page/components/language-switcher/language-switcher";
import HomePageForm from "@/src/ui/features/home/views/home-page/components/home-page-form/home-page-form";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import LocaleProvider from "@/src/ui/containers/locale-provider";
import type { LocaleParams } from "@/src/ui/view-models/params-view-model";

export default async function HomePage({ params: { locale } }: LocaleParams) {
  // unstable_setRequestLocale only use when page can be statically rendered
  unstable_setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <LocaleProvider keys={["home"]}>
      <div className={css.wrapper}>
        <h1>{t("home_title")}</h1>
        <div className={css.locale}>
          <p>{t("hello_world")}</p>
          <LanguageSwitcher />
        </div>
        <HomePageForm />
      </div>
    </LocaleProvider>
  );
}
