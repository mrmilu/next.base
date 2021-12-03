import { DummyUser } from "@/src/core/dummy/domain/models/dummy_user";

export type DummyRepositoryProvider = () => Promise<IDummyRepository>;

export interface IDummyRepository {
  users(): Promise<Array<DummyUser>>;
}
