import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ServicioFunerario, ServicioFunerarioRelations, Sala} from '../models';
import {SalaRepository} from './sala.repository';

export class ServicioFunerarioRepository extends DefaultCrudRepository<
  ServicioFunerario,
  typeof ServicioFunerario.prototype.id_servicio_funerario,
  ServicioFunerarioRelations
> {

  public readonly sala: BelongsToAccessor<Sala, typeof ServicioFunerario.prototype.id_servicio_funerario>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>,
  ) {
    super(ServicioFunerario, dataSource);
    this.sala = this.createBelongsToAccessorFor('sala', salaRepositoryGetter,);
    this.registerInclusionResolver('sala', this.sala.inclusionResolver);
  }
}
