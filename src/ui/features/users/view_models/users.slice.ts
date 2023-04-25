import type { User } from "@/src/core/users/domain/models/user";


export interface UsersSliceState {
  users: Array<User>;
  loading: boolean;
}
