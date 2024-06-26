import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {CredencialesPlanCategoria, Plan} from '../models';
import {PlanRepository} from '../repositories';
import {PlanService} from '../services';

export class PlanController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
    @service(PlanService)
    public servicioPlan: PlanService
  ) { }

  /*@authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPlanId, ConfiguracionSeguridad.guardarAccion]
  })*/
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

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPlanId, ConfiguracionSeguridad.listarAccion]
  })
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

  /*@authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPlanId, ConfiguracionSeguridad.listarAccion]
  })*/
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

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPlanId, ConfiguracionSeguridad.editarAccion]
  })
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

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPlanId, ConfiguracionSeguridad.listarAccion]
  })
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

  /*@authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPlanId, ConfiguracionSeguridad.editarAccion]
  })*/
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

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPlanId, ConfiguracionSeguridad.guardarAccion]
  })
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

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPlanId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/plan/{id}')
  @response(204, {
    description: 'Plan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.planRepository.deleteById(id);
  }

  @get('/plan-y-categoria')
  @response(200, {
    description: 'Se muestran todos los servicios funerarios y las reseñas de un cliente',
    content: {'application/json': {schema: getModelSchemaRef(CredencialesPlanCategoria)}},
  })
  async obtenerUnPLanConCategoría(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(CredencialesPlanCategoria)
          }
        }
      }
    )
    datos: CredencialesPlanCategoria
  ): Promise<Object> {
    let plan = await this.servicioPlan.ObtenerPlanConCategoria(datos.idPlan)
    if (plan) {
      return plan
    }
    else {
      return new HttpErrors[401]("El plan no existe")
    }
  }

}
