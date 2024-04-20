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
import {ServicioPlan} from '../models';
import {ServicioPlanRepository} from '../repositories';
import {AutoEncryptionLoggerLevel} from 'mongodb';
import {authenticate} from '@loopback/authentication';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';

export class ServicioPlanController {
  constructor(
    @repository(ServicioPlanRepository)
    public servicioPlanRepository : ServicioPlanRepository,
  ) {}

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuServicioPlanId, ConfiguracionSeguridad.guardarAccion]
  })
  @post('/servicio-plan')
  @response(200, {
    description: 'ServicioPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(ServicioPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioPlan, {
            title: 'NewServicioPlan',
            exclude: ['id'],
          }),
        },
      },
    })
    servicioPlan: Omit<ServicioPlan, 'id'>,
  ): Promise<ServicioPlan> {
    return this.servicioPlanRepository.create(servicioPlan);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuServicioPlanId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/servicio-plan/count')
  @response(200, {
    description: 'ServicioPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ServicioPlan) where?: Where<ServicioPlan>,
  ): Promise<Count> {
    return this.servicioPlanRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuServicioPlanId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/servicio-plan')
  @response(200, {
    description: 'Array of ServicioPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ServicioPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ServicioPlan) filter?: Filter<ServicioPlan>,
  ): Promise<ServicioPlan[]> {
    return this.servicioPlanRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuServicioPlanId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/servicio-plan')
  @response(200, {
    description: 'ServicioPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioPlan, {partial: true}),
        },
      },
    })
    servicioPlan: ServicioPlan,
    @param.where(ServicioPlan) where?: Where<ServicioPlan>,
  ): Promise<Count> {
    return this.servicioPlanRepository.updateAll(servicioPlan, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuServicioPlanId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/servicio-plan/{id}')
  @response(200, {
    description: 'ServicioPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ServicioPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ServicioPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<ServicioPlan>
  ): Promise<ServicioPlan> {
    return this.servicioPlanRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuServicioPlanId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/servicio-plan/{id}')
  @response(204, {
    description: 'ServicioPlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioPlan, {partial: true}),
        },
      },
    })
    servicioPlan: ServicioPlan,
  ): Promise<void> {
    await this.servicioPlanRepository.updateById(id, servicioPlan);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuServicioPlanId, ConfiguracionSeguridad.editarAccion]
  })
  @put('/servicio-plan/{id}')
  @response(204, {
    description: 'ServicioPlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servicioPlan: ServicioPlan,
  ): Promise<void> {
    await this.servicioPlanRepository.replaceById(id, servicioPlan);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuServicioPlanId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/servicio-plan/{id}')
  @response(204, {
    description: 'ServicioPlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servicioPlanRepository.deleteById(id);
  }
}
