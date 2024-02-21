"use client";
import { useRouter } from "@/src/ui/i18n";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const t = useTranslations("home_page");
  const router = useRouter();
  const changeLanguage = (locale: string) => {
    router.push(`/`, { locale });
  };

  return (
    <>
      <p>{t("language_switcher")}</p>
      <select aria-label="Languages" name="language" value={"es"} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </>
  );
}
