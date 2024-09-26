"use client";
import { useRouter } from "@/src/shared/presentation/i18n";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const t = useTranslations("home");
  const locale = useLocale();
  const router = useRouter();
  const changeLanguage = (locale: string) => {
    router.replace(`/`, { locale });
  };

  return (
    <>
      <p>{t("language_switcher")}</p>
      <select aria-label="Languages" name="language" value={locale} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </>
  );
}
