import type { MouseEventHandler, PropsWithChildren } from "react";
import css from "./button.css";

export interface ButtonProps {
  onClick?: MouseEventHandler;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

export const Button = ({ children, onClick, type, disabled }: PropsWithChildren<ButtonProps>) => {
  return (
    <button className={css.button({ disabled })} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
