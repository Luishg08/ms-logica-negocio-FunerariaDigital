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
  Ciudad,
  Sede,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadSedeController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/sedes', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Sede',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sede>,
  ): Promise<Sede[]> {
    return this.ciudadRepository.sedes(id).find(filter);
  }

  @post('/ciudads/{id}/sedes', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sede)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.idCiudad,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {
            title: 'NewSedeInCiudad',
            exclude: ['idSede'],
            optional: ['ciudadId']
          }),
        },
      },
    }) sede: Omit<Sede, 'idSede'>,
  ): Promise<Sede> {
    return this.ciudadRepository.sedes(id).create(sede);
  }

  @patch('/ciudads/{id}/sedes', {
    responses: {
      '200': {
        description: 'Ciudad.Sede PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {partial: true}),
        },
      },
    })
    sede: Partial<Sede>,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.ciudadRepository.sedes(id).patch(sede, where);
  }

  @del('/ciudads/{id}/sedes', {
    responses: {
      '200': {
        description: 'Ciudad.Sede DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.ciudadRepository.sedes(id).delete(where);
  }
}
