import { Expose } from "class-transformer";
import { User } from "@/src/users/domain/models/user";
import type { DataModel } from "@/src/shared/domain/interfaces/data-model";

export class UserDTO implements DataModel<User> {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  email!: string;

  toDomain() {
    return new User({
      id: this.id,
      name: this.name,
      email: this.email
    });
  }
}
