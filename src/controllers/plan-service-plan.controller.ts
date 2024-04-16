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
import {PlanServicioPlan} from '../models';
import {PlanServicioPlanRepository} from '../repositories';

export class PlanServicePlanController {
  constructor(
    @repository(PlanServicioPlanRepository)
    public planServicioPlanRepository : PlanServicioPlanRepository,
  ) {}

  @post('/plan-service-plan')
  @response(200, {
    description: 'PlanServicioPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(PlanServicioPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicioPlan, {
            title: 'NewPlanServicioPlan',
            exclude: ['idServicioPlan'],
          }),
        },
      },
    })
    planServicioPlan: Omit<PlanServicioPlan, 'id'>,
  ): Promise<PlanServicioPlan> {
    return this.planServicioPlanRepository.create(planServicioPlan);
  }

  @get('/plan-service-plan/count')
  @response(200, {
    description: 'PlanServicioPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PlanServicioPlan) where?: Where<PlanServicioPlan>,
  ): Promise<Count> {
    return this.planServicioPlanRepository.count(where);
  }

  @get('/plan-service-plan')
  @response(200, {
    description: 'Array of PlanServicioPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PlanServicioPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PlanServicioPlan) filter?: Filter<PlanServicioPlan>,
  ): Promise<PlanServicioPlan[]> {
    return this.planServicioPlanRepository.find(filter);
  }

  @patch('/plan-service-plan')
  @response(200, {
    description: 'PlanServicioPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicioPlan, {partial: true}),
        },
      },
    })
    planServicioPlan: PlanServicioPlan,
    @param.where(PlanServicioPlan) where?: Where<PlanServicioPlan>,
  ): Promise<Count> {
    return this.planServicioPlanRepository.updateAll(planServicioPlan, where);
  }

  @get('/plan-service-plan/{id}')
  @response(200, {
    description: 'PlanServicioPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PlanServicioPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PlanServicioPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<PlanServicioPlan>
  ): Promise<PlanServicioPlan> {
    return this.planServicioPlanRepository.findById(id, filter);
  }

  @patch('/plan-service-plan/{id}')
  @response(204, {
    description: 'PlanServicioPlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanServicioPlan, {partial: true}),
        },
      },
    })
    planServicioPlan: PlanServicioPlan,
  ): Promise<void> {
    await this.planServicioPlanRepository.updateById(id, planServicioPlan);
  }

  @put('/plan-service-plan/{id}')
  @response(204, {
    description: 'PlanServicioPlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() planServicioPlan: PlanServicioPlan,
  ): Promise<void> {
    await this.planServicioPlanRepository.replaceById(id, planServicioPlan);
  }

  @del('/plan-service-plan/{id}')
  @response(204, {
    description: 'PlanServicioPlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planServicioPlanRepository.deleteById(id);
  }
}
