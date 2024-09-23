"use client";
import type { PropsWithChildren } from "react";
import { User } from "@/src/users/domain/models/user";
import type { ConstructorType } from "@/src/common/interfaces/constructor-type";

import { createProvider } from "@/src/common/utils/zustand";
import type { UsersListStateViewModel } from "@/src/users/presentation/view-models/users-list-state";

export const useUsersListProvider = createProvider<UsersListStateViewModel>(() => () => ({
  users: []
}));

interface Props {
  users: Array<Record<string, unknown>>;
}

export default function UsersProvider({ users, children }: PropsWithChildren<Props>) {
  return (
    <useUsersListProvider.State initialState={{ users: users.map((u) => new User(u as ConstructorType<User>)) }}>
      {children}
    </useUsersListProvider.State>
  );
}
