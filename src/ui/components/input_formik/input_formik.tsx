import { useField } from "formik";
import { FormikInputProps } from "../../view_models/formik";

interface InputFormikProps extends FormikInputProps {
  label: string;
}

export const InputFormik = ({ label, name }: InputFormikProps) => {
  const [field, meta] = useField(name);
  return (
    <>
      <label>
        {label}
        <input {...field} />
      </label>
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </>
  );
};
