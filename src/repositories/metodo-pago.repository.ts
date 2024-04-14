import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {MetodoPago, MetodoPagoRelations, Cliente, MetodoPagoCliente} from '../models';
import {MetodoPagoClienteRepository} from './metodo-pago-cliente.repository';
import {ClienteRepository} from './cliente.repository';

export class MetodoPagoRepository extends DefaultCrudRepository<
  MetodoPago,
  typeof MetodoPago.prototype.idMetodoPago,
  MetodoPagoRelations
> {

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id_cliente,
          MetodoPagoCliente,
          typeof MetodoPago.prototype.idMetodoPago
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MetodoPagoClienteRepository') protected metodoPagoClienteRepositoryGetter: Getter<MetodoPagoClienteRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(MetodoPago, dataSource);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, metodoPagoClienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
