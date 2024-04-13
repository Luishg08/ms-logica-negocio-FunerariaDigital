import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ServicioFunerario, ServicioFunerarioRelations} from '../models';

export class ServicioFunerarioRepository extends DefaultCrudRepository<
  ServicioFunerario,
  typeof ServicioFunerario.prototype.id_servicio_funerario,
  ServicioFunerarioRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ServicioFunerario, dataSource);
  }
}
