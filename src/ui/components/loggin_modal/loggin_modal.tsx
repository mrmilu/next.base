import { forwardRef } from "react";
import { LoggingModalStyled } from "./loggin_modal.styled";

// eslint-disable-next-line react/display-name
export const LoggingModal = forwardRef<HTMLDivElement, unknown>((props, ref) => {
  return (
    <LoggingModalStyled ref={ref}>
      <h4>Please log in to access Dummy Page</h4>
    </LoggingModalStyled>
  );
});
