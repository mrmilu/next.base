import { FieldInputProps, FieldMetaProps } from "formik";

export interface BaseFormikProps<Val = any> {
  meta: FieldMetaProps<Val>;
  field: FieldInputProps<Val>;
}
