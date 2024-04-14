import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, Cliente, ClientePlan, ServicioPlan, PlanServicioPlan} from '../models';
import {ClientePlanRepository} from './cliente-plan.repository';
import {ClienteRepository} from './cliente.repository';
import {PlanServicioPlanRepository} from './plan-servicio-plan.repository';
import {ServicioPlanRepository} from './servicio-plan.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id_cliente,
          ClientePlan,
          typeof Plan.prototype.id
        >;

  public readonly servicios: HasManyThroughRepositoryFactory<ServicioPlan, typeof ServicioPlan.prototype.id,
          PlanServicioPlan,
          typeof Plan.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PlanServicioPlanRepository') protected planServicioPlanRepositoryGetter: Getter<PlanServicioPlanRepository>, @repository.getter('ServicioPlanRepository') protected servicioPlanRepositoryGetter: Getter<ServicioPlanRepository>,
  ) {
    super(Plan, dataSource);
    this.servicios = this.createHasManyThroughRepositoryFactoryFor('servicios', servicioPlanRepositoryGetter, planServicioPlanRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, clientePlanRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
