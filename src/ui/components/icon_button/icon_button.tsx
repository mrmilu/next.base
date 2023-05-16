import type { MouseEventHandler, ReactNode } from "react";
import React, { forwardRef } from "react";
import Styled from "./icon_button.styled";

export interface IconButtonProps {
  onClick?: MouseEventHandler;
  href?: string;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  asLink?: boolean;
}

export const IconButton = forwardRef<HTMLAnchorElement, IconButtonProps>(
  ({ href, onClick, icon, disabled = false, className, asLink = false }, ref) => {
    if (asLink) {
      return (
        <Styled.Wrapper as="a" className={className} href={href} onClick={onClick} ref={ref}>
          {icon}
        </Styled.Wrapper>
      );
    }
    return (
      <Styled.Wrapper disabled={disabled} className={className} onClick={onClick}>
        {icon}
      </Styled.Wrapper>
    );
  }
);
