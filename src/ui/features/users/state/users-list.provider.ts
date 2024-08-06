import { createProvider } from "@/src/common/utils/zustand";
import type { UsersListStateViewModel } from "@/src/ui/features/users/view-models/users-list-state";

export const useUsersListProvider = createProvider<UsersListStateViewModel>(() => () => ({
  users: []
}));
