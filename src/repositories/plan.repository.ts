import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, Cliente, ClientePlan, ServicioPlan, PlanServicioPlan, CategoriaPlan} from '../models';
import {ClientePlanRepository} from './cliente-plan.repository';
import {ClienteRepository} from './cliente.repository';
import {PlanServicioPlanRepository} from './plan-servicio-plan.repository';
import {ServicioPlanRepository} from './servicio-plan.repository';
import {CategoriaPlanRepository} from './categoria-plan.repository';

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

  public readonly categoriaPlan: BelongsToAccessor<CategoriaPlan, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PlanServicioPlanRepository') protected planServicioPlanRepositoryGetter: Getter<PlanServicioPlanRepository>, @repository.getter('ServicioPlanRepository') protected servicioPlanRepositoryGetter: Getter<ServicioPlanRepository>, @repository.getter('CategoriaPlanRepository') protected categoriaPlanRepositoryGetter: Getter<CategoriaPlanRepository>,
  ) {
    super(Plan, dataSource);
    this.categoriaPlan = this.createBelongsToAccessorFor('categoriaPlan', categoriaPlanRepositoryGetter,);
    this.registerInclusionResolver('categoriaPlan', this.categoriaPlan.inclusionResolver);
    this.servicios = this.createHasManyThroughRepositoryFactoryFor('servicios', servicioPlanRepositoryGetter, planServicioPlanRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, clientePlanRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
