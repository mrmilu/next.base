import type { GetStaticProps, NextPage } from "next";
import styles from "./Home.module.scss";
import { ReactElement } from "react";
import { MyButton } from "@/src/ui/components/my_button/my_button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { MyInputFormik } from "@/src/ui/components/my_input_formik/my_input_formik";
import { Form, Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import Link from "next/link";
import { MyBaseLayout } from "@/src/ui/components/my_base_layout/my_base_layout";

interface FormValues {
  example: string;
}

const initialFormValues: FormValues = {
  example: ""
};

export default function Home() {
  const { t } = useTranslation();

  const onSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    alert(`This is your input value: ${values.example}`);
  };

  return (
    <div className={styles["next-base"]}>
      <p>{t("helloWorld")}</p>
      <Formik initialValues={initialFormValues} onSubmit={onSubmit}>
        <Form>
          <MyInputFormik label="Base input" name="example" />
          <MyButton type="submit">Test button</MyButton>
        </Form>
      </Formik>
      <Link href="/page_two">
        <a>Dummy section</a>
      </Link>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MyBaseLayout>{page}</MyBaseLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en"))
      // Will be passed to the page component as props
    }
  };
};
