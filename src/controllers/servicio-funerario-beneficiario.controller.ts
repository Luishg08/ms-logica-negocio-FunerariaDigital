import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ServicioFunerario,
  Beneficiario,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioBeneficiarioController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/beneficiario', {
    responses: {
      '200': {
        description: 'Beneficiario belonging to ServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Beneficiario),
          },
        },
      },
    },
  })
  async getBeneficiario(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id_servicio_funerario,
  ): Promise<Beneficiario> {
    return this.servicioFunerarioRepository.servicioFunerarioBeneficiario(id);
  }
}
