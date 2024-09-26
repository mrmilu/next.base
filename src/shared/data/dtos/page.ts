import { Exclude, Expose, Type } from "class-transformer";
import { Page } from "@/src/shared/domain/models/page";
import type { DataModel } from "@/src/shared/domain/interfaces/data-model";

export class PageDTO<ItemDataType extends DataModel<ItemDomainType>, ItemDomainType> {
  @Exclude()
  private type: new (...args: Array<unknown>) => unknown;

  @Expose({ name: "results" })
  @Type((options) => {
    return (options?.newObject as PageDTO<ItemDataType, ItemDomainType>).type;
  })
  items: Array<ItemDataType> = [];
  @Expose()
  totalCount?: number;
  @Expose()
  page?: number;
  @Expose()
  previous?: number;
  @Expose()
  next?: number;

  constructor(type: new (...args: Array<unknown>) => unknown) {
    this.type = type;
  }

  toDomain(): Page<ItemDomainType> {
    return new Page<ItemDomainType>({
      items: this.items.map((i) => i.toDomain()),
      totalCount: this.totalCount,
      page: this.page,
      previous: this.previous,
      next: this.next
    });
  }
}
