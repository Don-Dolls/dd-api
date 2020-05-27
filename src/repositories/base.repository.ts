import { DataMapper, DeleteOptions, QueryOptions } from '@aws/dynamodb-data-mapper';
import { equals, ConditionExpression, ConditionExpressionPredicate } from '@aws/dynamodb-expressions';
import { DynamoDB } from 'aws-sdk';

export default abstract class RepositoryBase<T> {
  // tslint:disable-next-line: variable-name
  private _mapper: DataMapper;

  constructor() {
    this._mapper = new DataMapper({
      client: new DynamoDB({ region: process.env.REGION }),
      tableNamePrefix: `${process.env.STAGE}.`,
    });

    console.log('prefix->', `${process.env.STAGE}`);
  }

  get mapper(): DataMapper {
    return this._mapper;
  }

  public async get(params: T): Promise<T | undefined> {
    try {
      return await this._mapper.get(params);
    } catch (e) {
      if (e.name && e.name === 'ItemNotFoundException') { return Promise.resolve(undefined); }
      throw e;
    }
  }

  // tslint:disable-next-line: no-shadowed-variable
  public async query<T>(type: (new () => T),
                        { indexName, keyCondition, filter, projection = [] }: { indexName?: string, keyCondition: ConditionExpression | {
    [propertyName: string]: ConditionExpressionPredicate | any; }, filter?: ConditionExpression, projection?: string[] }): Promise<T[]> {
    const result: T[] = [];

    const options: QueryOptions = { indexName, filter };
    if (projection.length > 0) { options.projection = projection; }

    for await (const obj of this.mapper.query(type, keyCondition, options)) {
      result.push(obj);
    }

    return result;
  }

  public save(entity: T): Promise<T> {
    console.log('mapper', this._mapper);
    return this._mapper.put(entity);
  }

  public async deleteByField(entity: T, field: string, value: any): Promise<T | undefined> {
    const conditionOptions: ConditionExpression = {
        ...equals(value),
        subject: field,
    };

    const options: DeleteOptions = { condition: conditionOptions };

    return await this.mapper.delete(entity, { ...options });
  }
}