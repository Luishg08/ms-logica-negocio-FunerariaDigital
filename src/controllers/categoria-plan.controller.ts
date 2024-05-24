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
import {CategoriaPlan} from '../models';
import {CategoriaPlanRepository} from '../repositories';

export class CategoriaPlanController {
  constructor(
    @repository(CategoriaPlanRepository)
    public categoriaPlanRepository : CategoriaPlanRepository,
  ) {}

  @post('/categoria-plan')
  @response(200, {
    description: 'CategoriaPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(CategoriaPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaPlan, {
            title: 'NewCategoriaPlan',
            exclude: ['idCategoria'],
          }),
        },
      },
    })
    categoriaPlan: Omit<CategoriaPlan, 'idCategoriaPlan'>,
  ): Promise<CategoriaPlan> {
    return this.categoriaPlanRepository.create(categoriaPlan);
  }

  @get('/categoria-plan/count')
  @response(200, {
    description: 'CategoriaPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CategoriaPlan) where?: Where<CategoriaPlan>,
  ): Promise<Count> {
    return this.categoriaPlanRepository.count(where);
  }

  @get('/categoria-plan')
  @response(200, {
    description: 'Array of CategoriaPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CategoriaPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CategoriaPlan) filter?: Filter<CategoriaPlan>,
  ): Promise<CategoriaPlan[]> {
    return this.categoriaPlanRepository.find(filter);
  }

  @patch('/categoria-plan')
  @response(200, {
    description: 'CategoriaPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaPlan, {partial: true}),
        },
      },
    })
    categoriaPlan: CategoriaPlan,
    @param.where(CategoriaPlan) where?: Where<CategoriaPlan>,
  ): Promise<Count> {
    return this.categoriaPlanRepository.updateAll(categoriaPlan, where);
  }

  @get('/categoria-plan/{id}')
  @response(200, {
    description: 'CategoriaPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CategoriaPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CategoriaPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<CategoriaPlan>
  ): Promise<CategoriaPlan> {
    return this.categoriaPlanRepository.findById(id, filter);
  }

  @patch('/categoria-plan/{id}')
  @response(204, {
    description: 'CategoriaPlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaPlan, {partial: true}),
        },
      },
    })
    categoriaPlan: CategoriaPlan,
  ): Promise<void> {
    await this.categoriaPlanRepository.updateById(id, categoriaPlan);
  }

  @put('/categoria-plan/{id}')
  @response(204, {
    description: 'CategoriaPlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() categoriaPlan: CategoriaPlan,
  ): Promise<void> {
    await this.categoriaPlanRepository.replaceById(id, categoriaPlan);
  }

  @del('/categoria-plan/{id}')
  @response(204, {
    description: 'CategoriaPlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.categoriaPlanRepository.deleteById(id);
  }
}
