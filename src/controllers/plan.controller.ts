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
import {Plan} from '../models';
import {PlanRepository} from '../repositories';

export class PlanController {
  constructor(
    @repository(PlanRepository)
    public planRepository : PlanRepository,
  ) {}

  @post('/plan')
  @response(200, {
    description: 'Plan model instance',
    content: {'application/json': {schema: getModelSchemaRef(Plan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlan',
            exclude: ['id'],
          }),
        },
      },
    })
    plan: Omit<Plan, 'id'>,
  ): Promise<Plan> {
    return this.planRepository.create(plan);
  }

  @get('/plan/count')
  @response(200, {
    description: 'Plan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Plan) where?: Where<Plan>,
  ): Promise<Count> {
    return this.planRepository.count(where);
  }

  @get('/plan')
  @response(200, {
    description: 'Array of Plan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Plan) filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.planRepository.find(filter);
  }

  @patch('/plan')
  @response(200, {
    description: 'Plan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Plan,
    @param.where(Plan) where?: Where<Plan>,
  ): Promise<Count> {
    return this.planRepository.updateAll(plan, where);
  }

  @get('/plan/{id}')
  @response(200, {
    description: 'Plan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Plan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Plan, {exclude: 'where'}) filter?: FilterExcludingWhere<Plan>
  ): Promise<Plan> {
    return this.planRepository.findById(id, filter);
  }

  @patch('/plan/{id}')
  @response(204, {
    description: 'Plan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Plan,
  ): Promise<void> {
    await this.planRepository.updateById(id, plan);
  }

  @put('/plan/{id}')
  @response(204, {
    description: 'Plan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() plan: Plan,
  ): Promise<void> {
    await this.planRepository.replaceById(id, plan);
  }

  @del('/plan/{id}')
  @response(204, {
    description: 'Plan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planRepository.deleteById(id);
  }
}
