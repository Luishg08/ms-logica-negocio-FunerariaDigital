import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PlanServicioPlan, PlanServicioPlanRelations} from '../models';

export class PlanServicioPlanRepository extends DefaultCrudRepository<
  PlanServicioPlan,
  typeof PlanServicioPlan.prototype.idServicioPlan,
  PlanServicioPlanRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PlanServicioPlan, dataSource);
  }
}
