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
  Sala,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioSalaController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/sala', {
    responses: {
      '200': {
        description: 'Sala belonging to ServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sala),
          },
        },
      },
    },
  })
  async getSala(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id_servicio_funerario,
  ): Promise<Sala> {
    return this.servicioFunerarioRepository.sala(id);
  }
}
