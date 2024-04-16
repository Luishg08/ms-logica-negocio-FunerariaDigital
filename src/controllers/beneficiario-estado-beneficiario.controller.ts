import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Beneficiario,
  EstadoBeneficiario,
} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioEstadoBeneficiarioController {
  constructor(
    @repository(BeneficiarioRepository)
    public beneficiarioRepository: BeneficiarioRepository,
  ) { }

  @get('/beneficiarios/{id}/estado-beneficiario', {
    responses: {
      '200': {
        description: 'EstadoBeneficiario belonging to Beneficiario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EstadoBeneficiario),
          },
        },
      },
    },
  })
  async getEstadoBeneficiario(
    @param.path.number('id') id: typeof Beneficiario.prototype.id_beneficiario,
  ): Promise<EstadoBeneficiario> {
    return this.beneficiarioRepository.estadoDeBeneficiario(id);
  }
}
