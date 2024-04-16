import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Sede,
  Sala,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeSalaController {
  constructor(
    @repository(SedeRepository) protected sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/salas', {
    responses: {
      '200': {
        description: 'Array of Sede has many Sala',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sala)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sala>,
  ): Promise<Sala[]> {
    return this.sedeRepository.salas(id).find(filter);
  }

  @post('/sedes/{id}/salas', {
    responses: {
      '200': {
        description: 'Sede model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sala)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Sede.prototype.idSede,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {
            title: 'NewSalaInSede',
            exclude: ['idSala'],
            optional: ['sedeId']
          }),
        },
      },
    }) sala: Omit<Sala, 'idSala'>,
  ): Promise<Sala> {
    return this.sedeRepository.salas(id).create(sala);
  }

  @patch('/sedes/{id}/salas', {
    responses: {
      '200': {
        description: 'Sede.Sala PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {partial: true}),
        },
      },
    })
    sala: Partial<Sala>,
    @param.query.object('where', getWhereSchemaFor(Sala)) where?: Where<Sala>,
  ): Promise<Count> {
    return this.sedeRepository.salas(id).patch(sala, where);
  }

  @del('/sedes/{id}/salas', {
    responses: {
      '200': {
        description: 'Sede.Sala DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sala)) where?: Where<Sala>,
  ): Promise<Count> {
    return this.sedeRepository.salas(id).delete(where);
  }
}
