import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pago, PagoRelations} from '../models';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.idPago,
  PagoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Pago, dataSource);
  }
}
