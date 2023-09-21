import css from "./home_page.css";
import { serverSideTranslation } from "@/src/ui/i18n";
import type { LngParamsViewModel } from "@/src/ui/view_models/params_view_model";
import LanguageSwitcher from "@/src/ui/features/home/views/home_page/components/language_switcher/language_switcher";
import HomePageForm from "@/src/ui/features/home/views/home_page/components/home_page_form/home_page_form";

// const tagManagerService = new TagManagerService();

export default async function HomePage({ params }: LngParamsViewModel) {
  const { t } = await serverSideTranslation(params.lng, "home");
  // useEffect(() => {
  //   // TODO improve inversify-generator to accept modules and third party deps with constantValue/dynamicValue https://github.com/inversify/InversifyJS/blob/master/wiki/value_injection.md
  //   tagManagerService.sendEvent("home_page_visit");
  // }, []);

  return (
    <div className={css.wrapper}>
      <h1>{t("home_title")}</h1>
      <div className={css.locale}>
        <p>{t("hello_world")}</p>
        <LanguageSwitcher lng={params.lng} />
      </div>
      <HomePageForm lng={params.lng} />
    </div>
  );
}
