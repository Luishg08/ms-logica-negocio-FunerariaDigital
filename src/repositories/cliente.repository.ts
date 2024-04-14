import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, MetodoPago, MetodoPagoCliente, Plan, ClientePlan} from '../models';
import {MetodoPagoClienteRepository} from './metodo-pago-cliente.repository';
import {MetodoPagoRepository} from './metodo-pago.repository';
import {ClientePlanRepository} from './cliente-plan.repository';
import {PlanRepository} from './plan.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id_cliente,
  ClienteRelations
> {

  public readonly metodosdepago: HasManyThroughRepositoryFactory<MetodoPago, typeof MetodoPago.prototype.idMetodoPago,
          MetodoPagoCliente,
          typeof Cliente.prototype.id_cliente
        >;

  public readonly plans: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          ClientePlan,
          typeof Cliente.prototype.id_cliente
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MetodoPagoClienteRepository') protected metodoPagoClienteRepositoryGetter: Getter<MetodoPagoClienteRepository>, @repository.getter('MetodoPagoRepository') protected metodoPagoRepositoryGetter: Getter<MetodoPagoRepository>, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Cliente, dataSource);
    this.plans = this.createHasManyThroughRepositoryFactoryFor('plans', planRepositoryGetter, clientePlanRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.metodosdepago = this.createHasManyThroughRepositoryFactoryFor('metodosdepago', metodoPagoRepositoryGetter, metodoPagoClienteRepositoryGetter,);
    this.registerInclusionResolver('metodosdepago', this.metodosdepago.inclusionResolver);
  }
}
