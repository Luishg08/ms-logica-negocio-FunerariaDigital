import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiario, Sala, ServicioFunerario, ServicioFunerarioRelations} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';
import {SalaRepository} from './sala.repository';

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
