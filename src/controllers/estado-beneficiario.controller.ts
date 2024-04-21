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
import {EstadoBeneficiario} from '../models';
import {EstadoBeneficiarioRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';

export class EstadoBeneficiarioController {
  constructor(
    @repository(EstadoBeneficiarioRepository)
    public estadoBeneficiarioRepository : EstadoBeneficiarioRepository,
  ) {}

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.estadoBeneficiarioId, ConfiguracionSeguridad.guardarAccion]
  })
  @post('/estado-beneficiario')
  @response(200, {
    description: 'EstadoBeneficiario model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoBeneficiario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoBeneficiario, {
            title: 'NewEstadoBeneficiario',
            exclude: ['id_estado'],
          }),
        },
      },
    })
    estadoBeneficiario: Omit<EstadoBeneficiario, 'id_estado'>,
  ): Promise<EstadoBeneficiario> {
    return this.estadoBeneficiarioRepository.create(estadoBeneficiario);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.estadoBeneficiarioId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/estado-beneficiario/count')
  @response(200, {
    description: 'EstadoBeneficiario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoBeneficiario) where?: Where<EstadoBeneficiario>,
  ): Promise<Count> {
    return this.estadoBeneficiarioRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.estadoBeneficiarioId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/estado-beneficiario')
  @response(200, {
    description: 'Array of EstadoBeneficiario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoBeneficiario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoBeneficiario) filter?: Filter<EstadoBeneficiario>,
  ): Promise<EstadoBeneficiario[]> {
    return this.estadoBeneficiarioRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.estadoBeneficiarioId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/estado-beneficiario')
  @response(200, {
    description: 'EstadoBeneficiario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoBeneficiario, {partial: true}),
        },
      },
    })
    estadoBeneficiario: EstadoBeneficiario,
    @param.where(EstadoBeneficiario) where?: Where<EstadoBeneficiario>,
  ): Promise<Count> {
    return this.estadoBeneficiarioRepository.updateAll(estadoBeneficiario, where);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.estadoBeneficiarioId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/estado-beneficiario/{id}')
  @response(200, {
    description: 'EstadoBeneficiario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoBeneficiario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoBeneficiario, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoBeneficiario>
  ): Promise<EstadoBeneficiario> {
    return this.estadoBeneficiarioRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.estadoBeneficiarioId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/estado-beneficiario/{id}')
  @response(204, {
    description: 'EstadoBeneficiario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoBeneficiario, {partial: true}),
        },
      },
    })
    estadoBeneficiario: EstadoBeneficiario,
  ): Promise<void> {
    await this.estadoBeneficiarioRepository.updateById(id, estadoBeneficiario);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.estadoBeneficiarioId, ConfiguracionSeguridad.guardarAccion]
  })
  @put('/estado-beneficiario/{id}')
  @response(204, {
    description: 'EstadoBeneficiario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoBeneficiario: EstadoBeneficiario,
  ): Promise<void> {
    await this.estadoBeneficiarioRepository.replaceById(id, estadoBeneficiario);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.estadoBeneficiarioId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/estado-beneficiario/{id}')
  @response(204, {
    description: 'EstadoBeneficiario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoBeneficiarioRepository.deleteById(id);
  }
}
