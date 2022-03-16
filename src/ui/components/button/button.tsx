import { MouseEventHandler, PropsWithChildren } from "react";
import { ButtonStyled } from "@/src/ui/components/button/button.styled";

export interface ButtonProps {
  onClick?: MouseEventHandler;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

export const Button = ({ children, onClick, type, disabled }: PropsWithChildren<ButtonProps>) => {
  return (
    <ButtonStyled type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};
