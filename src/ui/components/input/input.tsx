import { FieldInputProps, FieldMetaProps, FormikHandlers, useField } from "formik";
import { BaseFormikProps } from "../../view_models/formik";
import { InputErrorStyled, InputStyled, InputStyledWrapper } from "@/src/ui/components/input/input.styled";
import { FocusEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler } from "react";

interface InputProps {
  label?: string;
  id: string;
  name?: string;
  onChange?: FormikHandlers["handleChange"];
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FormikHandlers["handleBlur"];
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  formik?: BaseFormikProps;
  value?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
}

export const Input = ({
  value,
  label,
  onChange,
  onKeyPress,
  onFocus,
  onBlur,
  onKeyDown,
  placeholder,
  formik,
  name,
  id,
  className,
  type
}: InputProps) => {
  let field: FieldInputProps<any>;
  let meta: FieldMetaProps<any>;
  if (formik) {
    field = formik.field;
    meta = formik.meta;
  } else {
    const emptyHandler = () => {};
    field = {
      onBlur: onBlur || emptyHandler,
      value: value,
      onChange: onChange || emptyHandler,
      name: name || ""
    };
    meta = { initialTouched: false, initialValue: undefined, value: undefined, touched: false };
  }

  return (
    <InputStyledWrapper>
      <InputStyled className={className} htmlFor={id}>
        {label && <span>{label}</span>}
        <input type={type} id={id} placeholder={placeholder} onFocus={onFocus} onKeyDown={onKeyDown} onKeyPress={onKeyPress} {...field} />
      </InputStyled>
      {meta.error && meta.touched && (
        <InputErrorStyled>
          <p>{meta.error}</p>
        </InputErrorStyled>
      )}
    </InputStyledWrapper>
  );
};

type InputFormikProps = Omit<InputProps, "formik" | "name" | "id"> & { name: string; id?: string };

export const InputFormik = ({ id, label, name, onChange, placeholder, className, type }: InputFormikProps) => {
  const [field, meta] = useField({ name, type });
  if (onChange) field.onChange = onChange;
  return <Input id={id ?? name} formik={{ field, meta }} label={label} placeholder={placeholder} className={className} />;
};