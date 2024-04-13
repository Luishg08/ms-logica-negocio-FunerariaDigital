import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ServicioPlan, ServicioPlanRelations} from '../models';

export class ServicioPlanRepository extends DefaultCrudRepository<
  ServicioPlan,
  typeof ServicioPlan.prototype.id,
  ServicioPlanRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ServicioPlan, dataSource);
  }
}
