import { MouseEventHandler, PropsWithChildren } from "react";
import { ButtonStyled } from "@/src/ui/components/button/button.styled";

export interface ButtonProps {
  onClick?: MouseEventHandler;
  type?: "submit" | "reset" | "button";
}

export const Button = ({ children, onClick, type }: PropsWithChildren<ButtonProps>) => {
  return (
    <ButtonStyled type={type} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};
