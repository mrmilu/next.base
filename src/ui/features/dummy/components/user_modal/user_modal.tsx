import Styled from "@/src/ui/features/dummy/components/user_modal/user_modal.styled";
import type { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";
import { forwardRef } from "react";

interface UserModalProps {
  user: DummyUser;
}

// eslint-disable-next-line react/display-name
export const UserModal = forwardRef<HTMLDivElement, UserModalProps>(({ user }, ref) => {
  return (
    <Styled.Wrapper id={user.id} ref={ref}>
      <Styled.Content>
        <h3>
          <b>Name:</b> {user.name}
        </h3>
        <p>
          <b>Email</b>: {user.email}
        </p>
        <small>ID: {user.id}</small>
      </Styled.Content>
    </Styled.Wrapper>
  );
});
