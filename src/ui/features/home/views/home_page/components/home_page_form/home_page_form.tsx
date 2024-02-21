"use client";
import { Button } from "@/src/ui/components/button/button";
import { ControlledInput } from "@/src/ui/components/input/input";
import { timeout } from "@front_web_mrmilu/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import css from "../../home_page.css";
import { useTranslationClient } from "@/src/ui/i18n/client";
import { BaseError } from "@/src/core/app/domain/models/base_error";

interface Props {
  lng: string;
}

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

export default function HomePageForm({ lng }: Props) {
  const { t } = useTranslationClient(lng, "home");
  const validationSchema = useMemo(
    () =>
      object().shape({
        name: string().required(t("form.errors.required")),
        email: string().required(t("form.errors.required")).email(t("form.errors.email")),
        age: string().isNumber(t("form.errors.number")).required(t("form.errors.required")).isNotUnderAge(t("form.errors.underAge"))
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

  const age = form.watch("age");

  useEffect(() => {
    if (Number(age) > 40) {
      throw new BaseError("The user is too old xD");
    }
  }, [age]);

  return (
    <FormProvider {...form}>
      <form className={css.form} onSubmit={form.handleSubmit(handleSubmit)}>
        <ControlledInput name="name" label={`${t("form.fields.name.label")}`} placeholder={`${t("form.fields.name.placeholder")}`} />
        <ControlledInput name="email" label={`${t("form.fields.email.label")}`} placeholder={`${t("form.fields.email.placeholder")}`} />
        <ControlledInput name="age" type="number" label={`${t("form.fields.age.label")}`} placeholder={`${t("form.fields.age.placeholder")}`} />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {t("form.submit")}
        </Button>
      </form>
    </FormProvider>
  );
}
