import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ServicioFunerario, ServicioFunerarioRelations, Sala, Beneficiario} from '../models';
import {SalaRepository} from './sala.repository';
import {BeneficiarioRepository} from './beneficiario.repository';

export class ServicioFunerarioRepository extends DefaultCrudRepository<
  ServicioFunerario,
  typeof ServicioFunerario.prototype.id_servicio_funerario,
  ServicioFunerarioRelations
> {

  public readonly sala: BelongsToAccessor<Sala, typeof ServicioFunerario.prototype.id_servicio_funerario>;

  public readonly servicioFunerarioBeneficiario: BelongsToAccessor<Beneficiario, typeof ServicioFunerario.prototype.id_servicio_funerario>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(ServicioFunerario, dataSource);
    this.servicioFunerarioBeneficiario = this.createBelongsToAccessorFor('servicioFunerarioBeneficiario', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarioBeneficiario', this.servicioFunerarioBeneficiario.inclusionResolver);
    this.sala = this.createBelongsToAccessorFor('sala', salaRepositoryGetter,);
    this.registerInclusionResolver('sala', this.sala.inclusionResolver);
  }
}
