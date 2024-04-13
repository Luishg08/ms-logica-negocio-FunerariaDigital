import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sala, SalaRelations} from '../models';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.idSala,
  SalaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Sala, dataSource);
  }
}
