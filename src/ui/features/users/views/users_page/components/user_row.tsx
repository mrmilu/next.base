"use client";
import { SimpleCard } from "@/src/ui/components/simple_card/simple_card";
import { useUiProvider } from "@/src/ui/providers/ui.provider";
import type { User } from "@/src/core/users/domain/models/user";
import { UserModal } from "@/src/ui/features/users/components/user_modal/user_modal";

interface Props {
  user: User;
}
export default function UserRow({ user }: Props) {
  const showModal = useUiProvider((state) => state.showModal);
  const showUserModal = (user: User) => {
    showModal(<UserModal user={user} />);
  };

  return <SimpleCard onClick={() => showUserModal(user)} title={user.name} subtitle={user.email} />;
}
