import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoBeneficiario, EstadoBeneficiarioRelations} from '../models';

export class EstadoBeneficiarioRepository extends DefaultCrudRepository<
  EstadoBeneficiario,
  typeof EstadoBeneficiario.prototype.id_estado,
  EstadoBeneficiarioRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(EstadoBeneficiario, dataSource);
  }
}
