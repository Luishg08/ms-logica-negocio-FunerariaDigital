import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ciudad,
  Departamento,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadDepartamentoController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Ciudad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departamento),
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.number('id') id: typeof Ciudad.prototype.idCiudad,
  ): Promise<Departamento> {
    return this.ciudadRepository.departamento(id);
  }
}
