"use client";
import { useTranslationClient } from "@/src/ui/i18n/client";
import { useRouter } from "next/navigation";

interface Props {
  lng: string;
}
export default function LanguageSwitcher({ lng }: Props) {
  const { t } = useTranslationClient(lng, "home");
  const router = useRouter();
  const changeLanguage = (language: string) => {
    router.push(`/${language}`);
  };

  return (
    <>
      <p>{t("language_switcher")}</p>
      <select aria-label="Languages" name="language" value={lng} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="es-ES">ES</option>
        <option value="en-GB">EN</option>
      </select>
    </>
  );
}
