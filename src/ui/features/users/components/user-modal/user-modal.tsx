import { forwardRef } from "react";
import type { User } from "@/src/core/users/domain/models/user";
import { ModalContent } from "@/src/ui/components/modal/modal";
import css from "./user-modal.css";

interface UserModalProps {
  user: User;
}

export const UserModal = forwardRef<HTMLDivElement, UserModalProps>(({ user }, ref) => {
  return (
    <ModalContent className={css.content({ oddEven: Number(user.id) % 2 ? "odd" : "even" })} ref={ref}>
      <h3>
        <b>Name:</b> {user.name}
      </h3>
      <p>
        <b>Email</b>: {user.email}
      </p>
      <small>ID: {user.id}</small>
    </ModalContent>
  );
});
