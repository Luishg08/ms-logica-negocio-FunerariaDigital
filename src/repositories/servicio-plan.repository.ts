import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ServicioPlan, ServicioPlanRelations, Plan, PlanServicioPlan} from '../models';
import {PlanServicioPlanRepository} from './plan-servicio-plan.repository';
import {PlanRepository} from './plan.repository';

export class ServicioPlanRepository extends DefaultCrudRepository<
  ServicioPlan,
  typeof ServicioPlan.prototype.id,
  ServicioPlanRelations
> {

  public readonly planes: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          PlanServicioPlan,
          typeof ServicioPlan.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanServicioPlanRepository') protected planServicioPlanRepositoryGetter: Getter<PlanServicioPlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(ServicioPlan, dataSource);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planRepositoryGetter, planServicioPlanRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
