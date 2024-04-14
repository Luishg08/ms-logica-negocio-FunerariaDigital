import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pago, PagoRelations, MetodoPagoCliente, Factura} from '../models';
import {MetodoPagoClienteRepository} from './metodo-pago-cliente.repository';
import {FacturaRepository} from './factura.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.idPago,
  PagoRelations
> {

  public readonly metodoPagoCliente: BelongsToAccessor<MetodoPagoCliente, typeof Pago.prototype.idPago>;

  public readonly factura: HasOneRepositoryFactory<Factura, typeof Pago.prototype.idPago>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MetodoPagoClienteRepository') protected metodoPagoClienteRepositoryGetter: Getter<MetodoPagoClienteRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Pago, dataSource);
    this.factura = this.createHasOneRepositoryFactoryFor('factura', facturaRepositoryGetter);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.metodoPagoCliente = this.createBelongsToAccessorFor('metodoPagoCliente', metodoPagoClienteRepositoryGetter,);
    this.registerInclusionResolver('metodoPagoCliente', this.metodoPagoCliente.inclusionResolver);
  }
}
