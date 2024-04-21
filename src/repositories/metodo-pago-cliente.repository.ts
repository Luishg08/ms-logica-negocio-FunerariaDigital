import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {MetodoPagoCliente, MetodoPagoClienteRelations, Pago, Cliente} from '../models';
import {PagoRepository} from './pago.repository';
import {ClienteRepository} from './cliente.repository';

export class MetodoPagoClienteRepository extends DefaultCrudRepository<
  MetodoPagoCliente,
  typeof MetodoPagoCliente.prototype.idMetodoPagoCliente,
  MetodoPagoClienteRelations
> {

  public readonly pagos: HasManyRepositoryFactory<Pago, typeof MetodoPagoCliente.prototype.idMetodoPagoCliente>;

  public readonly miCliente: BelongsToAccessor<Cliente, typeof MetodoPagoCliente.prototype.idMetodoPagoCliente>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(MetodoPagoCliente, dataSource);
    this.miCliente = this.createBelongsToAccessorFor('miCliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('miCliente', this.miCliente.inclusionResolver);
    this.pagos = this.createHasManyRepositoryFactoryFor('pagos', pagoRepositoryGetter,);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
  }
}
