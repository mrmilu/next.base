import { useField } from "formik";
import { FormikInputProps } from "../../view_models/formik";
import styles from "./my_input_formik.module.scss";

interface MyInputFormikProps extends FormikInputProps {
  label: string;
}

export const MyInputFormik = ({ label, name }: MyInputFormikProps) => {
  const [field, meta] = useField(name);
  return (
    <>
      <label className={styles["my_input_formik"]}>
        {label}
        <input {...field} />
      </label>
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </>
  );
};
