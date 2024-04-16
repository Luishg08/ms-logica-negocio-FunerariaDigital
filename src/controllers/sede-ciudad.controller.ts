import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sede,
  Ciudad,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeCiudadController {
  constructor(
    @repository(SedeRepository)
    public sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Sede',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ciudad),
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Sede.prototype.idSede,
  ): Promise<Ciudad> {
    return this.sedeRepository.ciudad(id);
  }
}
