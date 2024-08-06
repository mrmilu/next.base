"use client";
import { useUsersListProvider } from "@/src/ui/features/users/state/users-list.provider";
import type { PropsWithChildren } from "react";
import { User } from "@/src/core/users/domain/models/user";
import type { ConstructorType } from "@/src/common/interfaces/constructor-type";

interface Props {
  users: Array<Record<string, unknown>>;
}

export default function UsersProviderWrapper({ users, children }: PropsWithChildren<Props>) {
  return (
    <useUsersListProvider.State initialState={{ users: users.map((u) => new User(u as ConstructorType<User>)) }}>
      {children}
    </useUsersListProvider.State>
  );
}
