import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ClientePlan, ClientePlanRelations, Plan} from '../models';
import {PlanRepository} from './plan.repository';

export class ClientePlanRepository extends DefaultCrudRepository<
  ClientePlan,
  typeof ClientePlan.prototype.idClientePlan,
  ClientePlanRelations
> {

  public readonly miPlan: HasOneRepositoryFactory<Plan, typeof ClientePlan.prototype.idClientePlan>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(ClientePlan, dataSource);
    this.miPlan = this.createHasOneRepositoryFactoryFor('miPlan', planRepositoryGetter);
    this.registerInclusionResolver('miPlan', this.miPlan.inclusionResolver);
  }
}
