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
  ClientePlan,
  Plan,
} from '../models';
import {ClientePlanRepository} from '../repositories';

export class ClientePlanPlanController {
  constructor(
    @repository(ClientePlanRepository) protected clientePlanRepository: ClientePlanRepository,
  ) { }

  @get('/cliente-plans/{id}/plan', {
    responses: {
      '200': {
        description: 'ClientePlan has one Plan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Plan),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan> {
    return this.clientePlanRepository.miPlan(id).get(filter);
  }

  @post('/cliente-plans/{id}/plan', {
    responses: {
      '200': {
        description: 'ClientePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ClientePlan.prototype.idClientePlan,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInClientePlan',
            exclude: ['id'],
            optional: ['clientePlanId']
          }),
        },
      },
    }) plan: Omit<Plan, 'id'>,
  ): Promise<Plan> {
    return this.clientePlanRepository.miPlan(id).create(plan);
  }

  @patch('/cliente-plans/{id}/plan', {
    responses: {
      '200': {
        description: 'ClientePlan.Plan PATCH success count',
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
    return this.clientePlanRepository.miPlan(id).patch(plan, where);
  }

  @del('/cliente-plans/{id}/plan', {
    responses: {
      '200': {
        description: 'ClientePlan.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.clientePlanRepository.miPlan(id).delete(where);
  }
}
