import { UserModalContentStyled, UserModalStyled } from "@/src/ui/features/dummy/components/user_modal/user_modal.styled";
import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";
import { forwardRef, Ref } from "react";

interface UserModalProps {
  user: DummyUser;
}

// eslint-disable-next-line react/display-name
export const UserModal = forwardRef<Ref<any>, UserModalProps>(({ user }, ref) => {
  return (
    <UserModalContentStyled id={user.id} ref={ref}>
      <UserModalStyled>
        <h3>
          <b>Name:</b> {user.name}
        </h3>
        <p>
          <b>Email</b>: {user.email}
        </p>
        <small>ID: {user.id}</small>
      </UserModalStyled>
    </UserModalContentStyled>
  );
});
