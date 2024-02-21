import css from "./home_page.css";
import LanguageSwitcher from "@/src/ui/features/home/views/home_page/components/language_switcher/language_switcher";
import HomePageForm from "@/src/ui/features/home/views/home_page/components/home_page_form/home_page_form";
import { getTranslations } from "next-intl/server";
import LocaleProvider from "@/src/ui/containers/locale_provider";

export default async function HomePage() {
  const t = await getTranslations("home_page");

  return (
    <LocaleProvider keys={["home_page"]}>
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
