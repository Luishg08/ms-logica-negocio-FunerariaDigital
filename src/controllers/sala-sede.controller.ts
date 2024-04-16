import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sala,
  Sede,
} from '../models';
import {SalaRepository} from '../repositories';

export class SalaSedeController {
  constructor(
    @repository(SalaRepository)
    public salaRepository: SalaRepository,
  ) { }

  @get('/salas/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Sala',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sede),
          },
        },
      },
    },
  })
  async getSede(
    @param.path.number('id') id: typeof Sala.prototype.idSala,
  ): Promise<Sede> {
    return this.salaRepository.sede(id);
  }
}
