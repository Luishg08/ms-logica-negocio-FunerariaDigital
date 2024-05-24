import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CategoriaPlan, CategoriaPlanRelations} from '../models';

export class CategoriaPlanRepository extends DefaultCrudRepository<
  CategoriaPlan,
  typeof CategoriaPlan.prototype.idCategoria,
  CategoriaPlanRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CategoriaPlan, dataSource);
  }
}
