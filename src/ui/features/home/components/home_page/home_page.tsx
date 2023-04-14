import { useTranslation } from "next-i18next";
import { FormikProvider, useFormik } from "formik";
import { InputFormik } from "@/src/ui/components/input/input";
import { Button } from "@/src/ui/components/button/button";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import Styled from "@/src/ui/features/home/components/home_page/home_page.styled";
import { useRouter } from "next/router";
import { BaseError } from "make-error";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { timeout } from "@front_web_mrmilu/utils";
import { locator } from "@/src/core/app/ioc";
import type { TagManagerService } from "@front_web_mrmilu/services";
import { TYPES } from "@/src/core/app/ioc/types";
import { number, object, string } from "yup";

interface FormValues {
  name: string;
  email: string;
  age: string;
}

const formValues: FormValues = {
  name: "",
  email: "",
  age: ""
};

export default function HomePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [firstSubmit, setFirstSubmit] = useState(false);
  const validationSchema = useMemo(
    () =>
      object().shape({
        name: string().required(`${t("form.errors.required")}`),
        email: string().required(`${t("form.errors.required")}`).email(`${t("form.errors.email")}`),
        age: number()
          .typeError(t("form.errors.number") ?? "")
          .required(`${t("form.errors.required")}`)
          .isNotUnderAge(`${t("form.errors.underAge")}`)
      }),
    [t]
  );

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit: async (values: FormValues) => {
      await timeout(3000);
      alert(`name: ${values.name}, email: ${values.email}, age: ${values.age}`);
    }
  });

  const changeLanguage = (language: string) => {
    router.push(`${router.basePath}`, router.asPath, { locale: language });
  };

  useEffect(() => {
    locator.get<TagManagerService>(TYPES.TagManagerService).sendEvent("home_page_visit");
  }, []);

  useEffect(() => {
    if (Number(formik.values.age) > 40) {
      throw new BaseError("The user is too old xD");
    }
  }, [formik.values.age]);

  return (
    <Styled.Wrapper>
      <h1>{t("homeTitle")}</h1>
      <Styled.Locale>
        <p>{t("helloWorld")}</p>
        <select aria-label="Languages" name="language" value={router.locale} onChange={(e) => changeLanguage(e.target.value)}>
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </Styled.Locale>
      <FormikProvider value={formik}>
        <Styled.Form>
          <InputFormik name="name" label={`${t("form.fields.name.label")}`} placeholder={`${t("form.fields.name.placeholder")}`} />
          <InputFormik name="email" label={`${t("form.fields.email.label")}`} placeholder={`${t("form.fields.email.placeholder")}`} />
          <InputFormik name="age" type="number" label={`${t("form.fields.age.label")}`} placeholder={`${t("form.fields.age.placeholder")}`} />
          <Button type="submit" disabled={formik.isSubmitting} onClick={() => setFirstSubmit(true)}>
            {t("form.submit")}
          </Button>
        </Styled.Form>
      </FormikProvider>
    </Styled.Wrapper>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout logged={page.props.logged}>
      <AppErrorBoundary>{page}</AppErrorBoundary>
    </BaseLayout>
  );
};
