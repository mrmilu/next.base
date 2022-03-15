import { useTranslation } from "next-i18next";
import { FormikHelpers } from "formik/dist/types";
import { Formik } from "formik";
import { InputFormik } from "@/src/ui/components/input_formik/input_formik";
import { Button } from "@/src/ui/components/button/button";
import Link from "next/link";
import { ReactElement } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { HomeFormStyled, HomePageStyled } from "@/src/ui/features/home/components/home_page/home_page.styled";

interface FormValues {
  example: string;
}

const initialFormValues: FormValues = {
  example: ""
};

export default function HomePage() {
  const { t } = useTranslation();

  const onSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    alert(`This is your input value: ${values.example}`);
  };

  return (
    <HomePageStyled>
      <p>{t("helloWorld")}</p>
      <Formik initialValues={initialFormValues} onSubmit={onSubmit}>
        <HomeFormStyled>
          <InputFormik label="Base input" name="example" />
          <Button type="submit">Test button</Button>
        </HomeFormStyled>
      </Formik>
      <Link href="/dummy">
        <a>Dummy section</a>
      </Link>
    </HomePageStyled>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
