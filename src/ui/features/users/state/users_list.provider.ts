import { createProvider } from "@/src/common/utils/zustand";
import type { UsersListStateViewModel } from "@/src/ui/features/users/view_models/users_list_state";

export const useUsersListProvider = createProvider<UsersListStateViewModel>(() => () => ({
  users: []
}));
