import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Departamento, Sede} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {SedeRepository} from './sede.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.idCiudad,
  CiudadRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudad.prototype.idCiudad>;

  public readonly sedes: HasManyRepositoryFactory<Sede, typeof Ciudad.prototype.idCiudad>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(Ciudad, dataSource);
    this.sedes = this.createHasManyRepositoryFactoryFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
