"use client";
import { useUiProvider } from "@/src/ui/providers/ui.provider";
import { useUsersListProvider } from "@/src/ui/features/users/state/users-list.provider";
import type { User } from "@/src/core/users/domain/models/user";
import { UserModal } from "@/src/ui/features/users/components/user-modal/user-modal";
import { SimpleCard } from "@/src/ui/components/simple-card/simple-card";

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
