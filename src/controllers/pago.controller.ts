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
import {Pago} from '../models';
import {PagoRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { ConfiguracionSeguridad } from '../config/configuracion.seguridad';

export class PagoController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository : PagoRepository,
  ) {}

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPagoId, ConfiguracionSeguridad.guardarAccion]

  })

  @post('/pago')
  @response(200, {
    description: 'Pago model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPago',
            exclude: ['idPago'],
          }),
        },
      },
    })
    pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.pagoRepository.create(pago);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPagoId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/pago/count')
  @response(200, {
    description: 'Pago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pago) where?: Where<Pago>,
  ): Promise<Count> {
    return this.pagoRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPagoId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/pago')
  @response(200, {
    description: 'Array of Pago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pago) filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.pagoRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPagoId, ConfiguracionSeguridad.editarAccion]

  })

  @patch('/pago')
  @response(200, {
    description: 'Pago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Pago,
    @param.where(Pago) where?: Where<Pago>,
  ): Promise<Count> {
    return this.pagoRepository.updateAll(pago, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPagoId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/pago/{id}')
  @response(200, {
    description: 'Pago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pago, {exclude: 'where'}) filter?: FilterExcludingWhere<Pago>
  ): Promise<Pago> {
    return this.pagoRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPagoId, ConfiguracionSeguridad.editarAccion]

  })

  @patch('/pago/{id}')
  @response(204, {
    description: 'Pago PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Pago,
  ): Promise<void> {
    await this.pagoRepository.updateById(id, pago);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPagoId, ConfiguracionSeguridad.guardarAccion]

  })

  @put('/pago/{id}')
  @response(204, {
    description: 'Pago PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pago: Pago,
  ): Promise<void> {
    await this.pagoRepository.replaceById(id, pago);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuPagoId, ConfiguracionSeguridad.eliminarAccion]

  })

  @del('/pago/{id}')
  @response(204, {
    description: 'Pago DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pagoRepository.deleteById(id);
  }
}
