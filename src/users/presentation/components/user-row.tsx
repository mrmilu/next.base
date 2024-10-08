"use client";
import { SimpleCard } from "@/src/shared/presentation/components/simple-card/simple-card";
import { useUiProvider } from "@/src/shared/presentation/providers/ui.provider";
import { User } from "@/src/users/domain/models/user";
import { UserModal } from "@/src/users/presentation/components/user-modal/user-modal";
import { useMemo } from "react";
import type { ConstructorType } from "@/src/shared/domain/interfaces/constructor-type";

interface Props {
  user: Record<string, unknown>;
}
export default function UserRow({ user }: Props) {
  const userDomain = useMemo(() => new User(user as ConstructorType<User>), [user]);
  const showModal = useUiProvider((state) => state.showModal);
  const showUserModal = (user: User) => {
    showModal(<UserModal user={user} />);
  };

  return <SimpleCard onClick={() => showUserModal(userDomain)} title={userDomain.name} subtitle={userDomain.email} />;
}
