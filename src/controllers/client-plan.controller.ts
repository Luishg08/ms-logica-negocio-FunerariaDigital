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
import {ClientePlan} from '../models';
import {ClientePlanRepository} from '../repositories';

export class ClientPlanController {
  constructor(
    @repository(ClientePlanRepository)
    public clientePlanRepository : ClientePlanRepository,
  ) {}
  
  @post('/client-plan')
  @response(200, {
    description: 'ClientePlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(ClientePlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {
            title: 'NewClientePlan',
            exclude: ['idClientePlan'],
          }),
        },
      },
    })
    clientePlan: Omit<ClientePlan, 'id'>,
  ): Promise<ClientePlan> {
    return this.clientePlanRepository.create(clientePlan);
  }

  @get('/client-plan/count')
  @response(200, {
    description: 'ClientePlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ClientePlan) where?: Where<ClientePlan>,
  ): Promise<Count> {
    return this.clientePlanRepository.count(where);
  }

  @get('/client-plan')
  @response(200, {
    description: 'Array of ClientePlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ClientePlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ClientePlan) filter?: Filter<ClientePlan>,
  ): Promise<ClientePlan[]> {
    return this.clientePlanRepository.find(filter);
  }

  @patch('/client-plan')
  @response(200, {
    description: 'ClientePlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {partial: true}),
        },
      },
    })
    clientePlan: ClientePlan,
    @param.where(ClientePlan) where?: Where<ClientePlan>,
  ): Promise<Count> {
    return this.clientePlanRepository.updateAll(clientePlan, where);
  }

  @get('/client-plan/{id}')
  @response(200, {
    description: 'ClientePlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ClientePlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ClientePlan, {exclude: 'where'}) filter?: FilterExcludingWhere<ClientePlan>
  ): Promise<ClientePlan> {
    return this.clientePlanRepository.findById(id, filter);
  }

  @patch('/client-plan/{id}')
  @response(204, {
    description: 'ClientePlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {partial: true}),
        },
      },
    })
    clientePlan: ClientePlan,
  ): Promise<void> {
    await this.clientePlanRepository.updateById(id, clientePlan);
  }

  @put('/client-plan/{id}')
  @response(204, {
    description: 'ClientePlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() clientePlan: ClientePlan,
  ): Promise<void> {
    await this.clientePlanRepository.replaceById(id, clientePlan);
  }

  @del('/client-plan/{id}')
  @response(204, {
    description: 'ClientePlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clientePlanRepository.deleteById(id);
  }
}
