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
ServicioPlan,
PlanServicioPlan,
Plan,
} from '../models';
import {ServicioPlanRepository} from '../repositories';

export class ServicioPlanPlanController {
  constructor(
    @repository(ServicioPlanRepository) protected servicioPlanRepository: ServicioPlanRepository,
  ) { }

  @get('/servicio-plans/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of ServicioPlan has many Plan through PlanServicioPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.servicioPlanRepository.planes(id).find(filter);
  }

  @post('/servicio-plans/{id}/plans', {
    responses: {
      '200': {
        description: 'create a Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicioPlan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInServicioPlan',
            exclude: ['id'],
          }),
        },
      },
    }) plan: Omit<Plan, 'id'>,
  ): Promise<Plan> {
    return this.servicioPlanRepository.planes(id).create(plan);
  }

  @patch('/servicio-plans/{id}/plans', {
    responses: {
      '200': {
        description: 'ServicioPlan.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.servicioPlanRepository.planes(id).patch(plan, where);
  }

  @del('/servicio-plans/{id}/plans', {
    responses: {
      '200': {
        description: 'ServicioPlan.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.servicioPlanRepository.planes(id).delete(where);
  }
}
