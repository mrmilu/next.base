import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";

export interface DummySliceState {
  users: Array<DummyUser>;
  loading: boolean;
}
