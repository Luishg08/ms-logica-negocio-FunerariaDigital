import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Sede} from '../models';
import {SedeRepository} from '../repositories';

export class SedeController {
  constructor(
    @repository(SedeRepository)
    public sedeRepository : SedeRepository,
  ) {}

  @post('/sede')
  @response(200, {
    description: 'Sede model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sede)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {
            title: 'NewSede',
            exclude: ['idSede'],
          }),
        },
      },
    })
    sede: Omit<Sede, 'idSede'>,
  ): Promise<Sede> {
    return this.sedeRepository.create(sede);
  }

  @get('/sede/count')
  @response(200, {
    description: 'Sede model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sede) where?: Where<Sede>,
  ): Promise<Count> {
    return this.sedeRepository.count(where);
  }

  @get('/sede')
  @response(200, {
    description: 'Array of Sede model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sede, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sede) filter?: Filter<Sede>,
  ): Promise<Sede[]> {
    return this.sedeRepository.find(filter);
  }

  @patch('/sede')
  @response(200, {
    description: 'Sede PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {partial: true}),
        },
      },
    })
    sede: Sede,
    @param.where(Sede) where?: Where<Sede>,
  ): Promise<Count> {
    return this.sedeRepository.updateAll(sede, where);
  }

  @get('/sede/{id}')
  @response(200, {
    description: 'Sede model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sede, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sede, {exclude: 'where'}) filter?: FilterExcludingWhere<Sede>
  ): Promise<Sede> {
    return this.sedeRepository.findById(id, filter);
  }

  @patch('/sede/{id}')
  @response(204, {
    description: 'Sede PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {partial: true}),
        },
      },
    })
    sede: Sede,
  ): Promise<void> {
    await this.sedeRepository.updateById(id, sede);
  }

  @put('/sede/{id}')
  @response(204, {
    description: 'Sede PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sede: Sede,
  ): Promise<void> {
    await this.sedeRepository.replaceById(id, sede);
  }

  @del('/sede/{id}')
  @response(204, {
    description: 'Sede DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sedeRepository.deleteById(id);
  }
}
