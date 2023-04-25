import Styled from "./user_modal.styled"
import { forwardRef } from "react";
import type { User } from "@/src/core/users/domain/models/user";

interface UserModalProps {
  user: User;
}

// eslint-disable-next-line react/display-name
export const UserModal = forwardRef<HTMLDivElement, UserModalProps>(({ user }, ref) => {
  return (
    <Styled.Wrapper id={ user.id } ref={ ref }>
      <Styled.Content>
        <h3>
          <b>Name:</b> { user.name }
        </h3>
        <p>
          <b>Email</b>: { user.email }
        </p>
        <small>ID: { user.id }</small>
      </Styled.Content>
    </Styled.Wrapper>
  );
});
