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
import {Resena} from '../models';
import {ResenaRepository} from '../repositories';

export class ResenaController {
  constructor(
    @repository(ResenaRepository)
    public resenaRepository : ResenaRepository,
  ) {}

  @post('/resena')
  @response(200, {
    description: 'Resena model instance',
    content: {'application/json': {schema: getModelSchemaRef(Resena)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {
            title: 'NewResena',
            exclude: ['id'],
          }),
        },
      },
    })
    resena: Omit<Resena, 'id'>,
  ): Promise<Resena> {
    return this.resenaRepository.create(resena);
  }

  @get('/resena/count')
  @response(200, {
    description: 'Resena model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Resena) where?: Where<Resena>,
  ): Promise<Count> {
    return this.resenaRepository.count(where);
  }

  @get('/resena')
  @response(200, {
    description: 'Array of Resena model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Resena, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Resena) filter?: Filter<Resena>,
  ): Promise<Resena[]> {
    return this.resenaRepository.find(filter);
  }

  @patch('/resena')
  @response(200, {
    description: 'Resena PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {partial: true}),
        },
      },
    })
    resena: Resena,
    @param.where(Resena) where?: Where<Resena>,
  ): Promise<Count> {
    return this.resenaRepository.updateAll(resena, where);
  }

  @get('/resena/{id}')
  @response(200, {
    description: 'Resena model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Resena, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Resena, {exclude: 'where'}) filter?: FilterExcludingWhere<Resena>
  ): Promise<Resena> {
    return this.resenaRepository.findById(id, filter);
  }

  @patch('/resena/{id}')
  @response(204, {
    description: 'Resena PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {partial: true}),
        },
      },
    })
    resena: Resena,
  ): Promise<void> {
    await this.resenaRepository.updateById(id, resena);
  }

  @put('/resena/{id}')
  @response(204, {
    description: 'Resena PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resena: Resena,
  ): Promise<void> {
    await this.resenaRepository.replaceById(id, resena);
  }

  @del('/resena/{id}')
  @response(204, {
    description: 'Resena DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resenaRepository.deleteById(id);
  }
}
