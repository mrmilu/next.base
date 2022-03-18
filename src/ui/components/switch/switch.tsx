import { SwitchStyled, SwitchWrapperStyled } from "@/src/ui/components/switch/switch.styled";
import { FieldInputProps, FieldMetaProps, FormikHandlers, useField } from "formik";
import { KeyboardEvent, useRef } from "react";
import { BaseFormikProps } from "@/src/ui/view_models/formik";

interface SwitchProps {
  label?: string;
  id: string;
  name?: string;
  onChange?: FormikHandlers["handleChange"];
  formik?: BaseFormikProps;
  value?: string;
  defaultChecked?: boolean;
  className?: string;
}

export const Switch = ({ value, label, onChange, formik, name, id, defaultChecked, className }: SwitchProps) => {
  const innerRef = useRef<HTMLInputElement>(null);
  let field: FieldInputProps<any>;
  let meta: FieldMetaProps<any>;
  if (formik) {
    field = formik.field;
    meta = formik.meta;
  } else {
    const emptyHandler = () => {};
    field = {
      onBlur: emptyHandler,
      value: value || undefined,
      onChange: onChange || emptyHandler,
      checked: defaultChecked,
      name: name || ""
    };
    meta = { initialTouched: false, initialValue: undefined, value: undefined, touched: false };
  }

  const handleKeypress = (e: KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      innerRef.current?.click();
    }
  };

  return (
    <SwitchWrapperStyled>
      {label && <p>{label}</p>}
      <SwitchStyled htmlFor={id} tabIndex={0} className={className} onKeyPress={handleKeypress}>
        <input
          ref={innerRef}
          id={id}
          name={field.name}
          type="checkbox"
          onChange={field.onChange}
          value={field.value}
          defaultChecked={field.checked}
        />
        <span />
      </SwitchStyled>
    </SwitchWrapperStyled>
  );
};

type SwitchFormikProps = Omit<SwitchProps, "formik" | "name" | "id"> & { name: string; id?: string };

export const SwitchFormik = ({ id, label, name, value, onChange, className, defaultChecked }: SwitchFormikProps) => {
  const [field, meta] = useField({ name, value, defaultChecked, type: "checkbox" });
  if (onChange) field.onChange = onChange;
  return <Switch id={id ?? name} formik={{ field, meta }} label={label} className={className} />;
};
