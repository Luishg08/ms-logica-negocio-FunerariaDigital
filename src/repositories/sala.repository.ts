import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sala, SalaRelations, ServicioFunerario} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.idSala,
  SalaRelations
> {

  public readonly serviciosFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof Sala.prototype.idSala>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(Sala, dataSource);
    this.serviciosFunerarios = this.createHasManyRepositoryFactoryFor('serviciosFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('serviciosFunerarios', this.serviciosFunerarios.inclusionResolver);
  }
}
