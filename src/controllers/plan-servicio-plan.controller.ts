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
Plan,
PlanServicioPlan,
ServicioPlan,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanServicioPlanController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/servicio-plans', {
    responses: {
      '200': {
        description: 'Array of Plan has many ServicioPlan through PlanServicioPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ServicioPlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ServicioPlan>,
  ): Promise<ServicioPlan[]> {
    return this.planRepository.servicios(id).find(filter);
  }

  @post('/plans/{id}/servicio-plans', {
    responses: {
      '200': {
        description: 'create a ServicioPlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioPlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioPlan, {
            title: 'NewServicioPlanInPlan',
            exclude: ['id'],
          }),
        },
      },
    }) servicioPlan: Omit<ServicioPlan, 'id'>,
  ): Promise<ServicioPlan> {
    return this.planRepository.servicios(id).create(servicioPlan);
  }

  @patch('/plans/{id}/servicio-plans', {
    responses: {
      '200': {
        description: 'Plan.ServicioPlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioPlan, {partial: true}),
        },
      },
    })
    servicioPlan: Partial<ServicioPlan>,
    @param.query.object('where', getWhereSchemaFor(ServicioPlan)) where?: Where<ServicioPlan>,
  ): Promise<Count> {
    return this.planRepository.servicios(id).patch(servicioPlan, where);
  }

  @del('/plans/{id}/servicio-plans', {
    responses: {
      '200': {
        description: 'Plan.ServicioPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ServicioPlan)) where?: Where<ServicioPlan>,
  ): Promise<Count> {
    return this.planRepository.servicios(id).delete(where);
  }
}
