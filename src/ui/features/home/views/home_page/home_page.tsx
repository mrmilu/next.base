import { locator } from "@/src/core/app/ioc";
import { TYPES } from "@/src/core/app/ioc/types";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { Button } from "@/src/ui/components/button/button";
import { ControlledInput } from "@/src/ui/components/input/input";
import Styled from "@/src/ui/features/home/views/home_page/home_page.styled";
import type { TagManagerService } from "@front_web_mrmilu/services";
import { timeout } from "@front_web_mrmilu/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseError } from "make-error";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

interface FormValues {
  name: string;
  email: string;
  age: string;
}

const defaultValues: FormValues = {
  name: "",
  email: "",
  age: ""
};

export default function HomePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const validationSchema = useMemo(
    () =>
      object().shape({
        name: string().required(`${t("form.errors.required")}`),
        email: string()
          .required(`${t("form.errors.required")}`)
          .email(`${t("form.errors.email")}`),
        age: string()
          .isNumber(`${t("form.errors.required")}`)
          .required(`${t("form.errors.required")}`)
          .isNotUnderAge(`${t("form.errors.underAge")}`)
      }),
    [t]
  );
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema, { abortEarly: false }),
    reValidateMode: "onChange"
  });
  const handleSubmit = async (values: FormValues) => {
    await timeout(3000);
    alert(`name: ${values.name}, email: ${values.email}, age: ${values.age}`);
  };

  const changeLanguage = (language: string) => {
    router.push(`${router.basePath}`, router.asPath, { locale: language });
  };

  useEffect(() => {
    locator.get<TagManagerService>(TYPES.TagManagerService).sendEvent("home_page_visit");
  }, []);

  const age = form.watch("age");

  useEffect(() => {
    if (Number(age) > 40) {
      throw new BaseError("The user is too old xD");
    }
  }, [age]);

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
      <FormProvider {...form}>
        <Styled.Form onSubmit={form.handleSubmit(handleSubmit)}>
          <ControlledInput name="name" label={`${t("form.fields.name.label")}`} placeholder={`${t("form.fields.name.placeholder")}`} />
          <ControlledInput name="email" label={`${t("form.fields.email.label")}`} placeholder={`${t("form.fields.email.placeholder")}`} />
          <ControlledInput name="age" type="number" label={`${t("form.fields.age.label")}`} placeholder={`${t("form.fields.age.placeholder")}`} />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t("form.submit")}
          </Button>
        </Styled.Form>
      </FormProvider>
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
