import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Resena, ResenaRelations, ServicioFunerario} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class ResenaRepository extends DefaultCrudRepository<
  Resena,
  typeof Resena.prototype.idResena,
  ResenaRelations
> {

  public readonly servicioFunerario: BelongsToAccessor<ServicioFunerario, typeof Resena.prototype.idResena>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(Resena, dataSource);
    this.servicioFunerario = this.createBelongsToAccessorFor('servicioFunerario', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerario', this.servicioFunerario.inclusionResolver);
  }
}
