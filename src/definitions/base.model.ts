import { hashKey } from "@aws/dynamodb-data-mapper-annotations";

export default abstract class EntityBase {
  @hashKey()
  public id!: string;
  createdAt: Date;

  constructor() {
    this.createdAt = new Date();
  }
}
