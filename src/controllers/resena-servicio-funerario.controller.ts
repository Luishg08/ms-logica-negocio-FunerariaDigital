import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Resena,
  ServicioFunerario,
} from '../models';
import {ResenaRepository} from '../repositories';

export class ResenaServicioFunerarioController {
  constructor(
    @repository(ResenaRepository)
    public resenaRepository: ResenaRepository,
  ) { }

  @get('/resenas/{id}/servicio-funerario', {
    responses: {
      '200': {
        description: 'ServicioFunerario belonging to Resena',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicioFunerario),
          },
        },
      },
    },
  })
  async getServicioFunerario(
    @param.path.number('id') id: typeof Resena.prototype.idResena,
  ): Promise<ServicioFunerario> {
    return this.resenaRepository.servicioFunerario(id);
  }
}
