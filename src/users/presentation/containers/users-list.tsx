"use client";
import { useUiProvider } from "@/src/shared/application/providers/ui.provider";
import { useUsersListProvider } from "@/src/users/application/providers/user-list-provider";
import type { User } from "@/src/users/domain/models/user";
import { UserModal } from "@/src/users/presentation/components/user-modal/user-modal";
import { SimpleCard } from "@/src/shared/presentation/components/simple-card/simple-card";

export default function UsersList() {
  const showModal = useUiProvider((state) => state.showModal);
  const users = useUsersListProvider((state) => state.users);

  const showUserModal = (user: User) => {
    showModal(<UserModal user={user} />);
  };

  return (
    <>
      {users.map((user, idx) => (
        <SimpleCard onClick={() => showUserModal(user)} key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
      ))}
    </>
  );
}
