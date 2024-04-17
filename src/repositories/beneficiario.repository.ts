import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, EstadoBeneficiario, ServicioFunerario, Cliente} from '../models';
import {EstadoBeneficiarioRepository} from './estado-beneficiario.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';
import {ClienteRepository} from './cliente.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.id_beneficiario,
  BeneficiarioRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof Beneficiario.prototype.id_beneficiario>;

  public readonly estadoDeBeneficiario: BelongsToAccessor<EstadoBeneficiario, typeof Beneficiario.prototype.id_beneficiario>;

  public readonly clienteBeneficiario: BelongsToAccessor<Cliente, typeof Beneficiario.prototype.id_beneficiario>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EstadoBeneficiarioRepository') protected estadoBeneficiarioRepositoryGetter: Getter<EstadoBeneficiarioRepository>, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.clienteBeneficiario = this.createBelongsToAccessorFor('clienteBeneficiario', clienteRepositoryGetter,);
    this.registerInclusionResolver('clienteBeneficiario', this.clienteBeneficiario.inclusionResolver);
    this.estadoDeBeneficiario = this.createBelongsToAccessorFor('estadoDeBeneficiario', estadoBeneficiarioRepositoryGetter,);
    this.registerInclusionResolver('estadoDeBeneficiario', this.estadoDeBeneficiario.inclusionResolver);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);

  }
}
