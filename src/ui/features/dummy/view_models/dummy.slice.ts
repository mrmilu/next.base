import type { User } from "@/src/core/users/domain/models/user";


export interface DummySliceState {
  users: Array<User>;
  loading: boolean;
}
