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
import {MetodoPago} from '../models';
import {MetodoPagoRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { ConfiguracionSeguridad } from '../config/configuracion.seguridad';

export class MetodoPagoController {
  constructor(
    @repository(MetodoPagoRepository)
    public metodoPagoRepository : MetodoPagoRepository,
  ) {}


  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuMetodoPagoId, ConfiguracionSeguridad.guardarAccion]
  })
  @post('/metodo-pago')
  @response(200, {
    description: 'MetodoPago model instance',
    content: {'application/json': {schema: getModelSchemaRef(MetodoPago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {
            title: 'NewMetodoPago',
            exclude: ['idMetodoPago'],
          }),
        },
      },
    })
    metodoPago: Omit<MetodoPago, 'id'>,
  ): Promise<MetodoPago> {
    return this.metodoPagoRepository.create(metodoPago);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuMetodoPagoId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/metodo-pago/count')
  @response(200, {
    description: 'MetodoPago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MetodoPago) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.metodoPagoRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuMetodoPagoId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/metodo-pago')
  @response(200, {
    description: 'Array of MetodoPago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MetodoPago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MetodoPago) filter?: Filter<MetodoPago>,
  ): Promise<MetodoPago[]> {
    return this.metodoPagoRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuMetodoPagoId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/metodo-pago')
  @response(200, {
    description: 'MetodoPago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: MetodoPago,
    @param.where(MetodoPago) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.metodoPagoRepository.updateAll(metodoPago, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuMetodoPagoId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/metodo-pago/{id}')
  @response(200, {
    description: 'MetodoPago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MetodoPago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MetodoPago, {exclude: 'where'}) filter?: FilterExcludingWhere<MetodoPago>
  ): Promise<MetodoPago> {
    return this.metodoPagoRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuMetodoPagoId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/metodo-pago/{id}')
  @response(204, {
    description: 'MetodoPago PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: MetodoPago,
  ): Promise<void> {
    await this.metodoPagoRepository.updateById(id, metodoPago);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuMetodoPagoId, ConfiguracionSeguridad.guardarAccion]
  })
  @put('/metodo-pago/{id}')
  @response(204, {
    description: 'MetodoPago PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() metodoPago: MetodoPago,
  ): Promise<void> {
    await this.metodoPagoRepository.replaceById(id, metodoPago);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuMetodoPagoId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/metodo-pago/{id}')
  @response(204, {
    description: 'MetodoPago DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.metodoPagoRepository.deleteById(id);
  }
}
