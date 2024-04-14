import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, MetodoPago, MetodoPagoCliente} from '../models';
import {MetodoPagoClienteRepository} from './metodo-pago-cliente.repository';
import {MetodoPagoRepository} from './metodo-pago.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id_cliente,
  ClienteRelations
> {

  public readonly metodosdepago: HasManyThroughRepositoryFactory<MetodoPago, typeof MetodoPago.prototype.idMetodoPago,
          MetodoPagoCliente,
          typeof Cliente.prototype.id_cliente
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MetodoPagoClienteRepository') protected metodoPagoClienteRepositoryGetter: Getter<MetodoPagoClienteRepository>, @repository.getter('MetodoPagoRepository') protected metodoPagoRepositoryGetter: Getter<MetodoPagoRepository>,
  ) {
    super(Cliente, dataSource);
    this.metodosdepago = this.createHasManyThroughRepositoryFactoryFor('metodosdepago', metodoPagoRepositoryGetter, metodoPagoClienteRepositoryGetter,);
    this.registerInclusionResolver('metodosdepago', this.metodosdepago.inclusionResolver);
  }
}
