import {
  attribute,
  hashKey,
  table,
  rangeKey,
} from '@aws/dynamodb-data-mapper-annotations';
import { v1 as uuidv1 } from 'uuid';
import EntityBase from './base.model';

@table('users')
export default class User extends EntityBase {
  @hashKey()
  public uid!: string;

  @attribute()
  public name!: string;

  @rangeKey()
  public email!: string;

  @attribute()
  public phone!: string;

  @attribute()
  public photoUrls!: string[];

  @attribute()
  public type!: 'common' | 'girl' | 'admin';

  constructor() {
    super();

    this.id = uuidv1();
  }
}