import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";

export interface IDummyRepository {
  users(): Promise<Array<DummyUser>>;
}
