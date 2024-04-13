import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Resena, ResenaRelations} from '../models';

export class ResenaRepository extends DefaultCrudRepository<
  Resena,
  typeof Resena.prototype.idResena,
  ResenaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Resena, dataSource);
  }
}
