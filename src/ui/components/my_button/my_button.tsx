import { MouseEventHandler } from "react";
import styles from "./my_button.module.scss";
import { WithChildren } from "../../view_models/base_props";

export interface ButtonProps extends WithChildren {
  onClick?: MouseEventHandler;
  type?: "submit" | "reset" | "button";
}

export const MyButton = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button className={styles["my_button"]} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
