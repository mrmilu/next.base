import css from "./home_page.css";
import LanguageSwitcher from "@/src/ui/features/home/views/home_page/components/language_switcher/language_switcher";
import HomePageForm from "@/src/ui/features/home/views/home_page/components/home_page_form/home_page_form";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import LocaleProvider from "@/src/ui/containers/locale_provider";
import type { LocaleParams } from "@/src/ui/view_models/params_view_model";

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
