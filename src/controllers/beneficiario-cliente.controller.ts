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
  Cliente,
} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioClienteController {
  constructor(
    @repository(BeneficiarioRepository)
    public beneficiarioRepository: BeneficiarioRepository,
  ) { }

  
  @get('/beneficiarios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Beneficiario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Beneficiario.prototype.id_beneficiario,
  ): Promise<Cliente> {
    return this.beneficiarioRepository.clienteBeneficiario(id);
  }
}
