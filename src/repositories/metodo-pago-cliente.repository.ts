import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {MetodoPagoCliente, MetodoPagoClienteRelations, Pago} from '../models';
import {PagoRepository} from './pago.repository';

export class MetodoPagoClienteRepository extends DefaultCrudRepository<
  MetodoPagoCliente,
  typeof MetodoPagoCliente.prototype.idMetodoPagoCliente,
  MetodoPagoClienteRelations
> {

  public readonly pagos: HasManyRepositoryFactory<Pago, typeof MetodoPagoCliente.prototype.idMetodoPagoCliente>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(MetodoPagoCliente, dataSource);
    this.pagos = this.createHasManyRepositoryFactoryFor('pagos', pagoRepositoryGetter,);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
  }
}
