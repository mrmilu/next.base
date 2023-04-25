import { forwardRef } from "react";
import Styled from "./logging_modal.styled";

// eslint-disable-next-line react/display-name
export const LoggingModal = forwardRef<HTMLDivElement, unknown>((props, ref) => {
  return (
    <Styled.Wrapper ref={ref}>
      <h4>Please log in to access Users Page</h4>
    </Styled.Wrapper>
  );
});
