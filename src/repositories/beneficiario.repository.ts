import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, EstadoBeneficiario, ServicioFunerario} from '../models';
import {EstadoBeneficiarioRepository} from './estado-beneficiario.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.id_beneficiario,
  BeneficiarioRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof Beneficiario.prototype.id_beneficiario>;

  public readonly estadoDeBeneficiario: BelongsToAccessor<EstadoBeneficiario, typeof Beneficiario.prototype.id_beneficiario>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EstadoBeneficiarioRepository') protected estadoBeneficiarioRepositoryGetter: Getter<EstadoBeneficiarioRepository>, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.estadoDeBeneficiario = this.createBelongsToAccessorFor('estadoDeBeneficiario', estadoBeneficiarioRepositoryGetter,);
    this.registerInclusionResolver('estadoDeBeneficiario', this.estadoDeBeneficiario.inclusionResolver);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);

  }
}
