import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {MetodoPagoCliente, MetodoPagoClienteRelations} from '../models';

export class MetodoPagoClienteRepository extends DefaultCrudRepository<
  MetodoPagoCliente,
  typeof MetodoPagoCliente.prototype.idMetodoPagoCliente,
  MetodoPagoClienteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(MetodoPagoCliente, dataSource);
  }
}
