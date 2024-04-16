import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sede, SedeRelations, Ciudad, Sala} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {SalaRepository} from './sala.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.idSede,
  SedeRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Sede.prototype.idSede>;

  public readonly salas: HasManyRepositoryFactory<Sala, typeof Sede.prototype.idSede>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>,
  ) {
    super(Sede, dataSource);
    this.salas = this.createHasManyRepositoryFactoryFor('salas', salaRepositoryGetter,);
    this.registerInclusionResolver('salas', this.salas.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
