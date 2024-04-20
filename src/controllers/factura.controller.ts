import {authenticate} from '@loopback/authentication';
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
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {Factura} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuFacturaId, ConfiguracionSeguridad.guardarAccion]

  })
  @post('/factura')
  @response(200, {
    description: 'Factura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Factura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFactura',
            exclude: ['idFactura'],
          }),
        },
      },
    })
    factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.facturaRepository.create(factura);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuFacturaId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/factura/count')
  @response(200, {
    description: 'Factura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Factura) where?: Where<Factura>,
  ): Promise<Count> {
    return this.facturaRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuFacturaId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/factura')
  @response(200, {
    description: 'Array of Factura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Factura, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Factura) filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.facturaRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuFacturaId, ConfiguracionSeguridad.editarAccion]

  })
  @patch('/factura')
  @response(200, {
    description: 'Factura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Factura,
    @param.where(Factura) where?: Where<Factura>,
  ): Promise<Count> {
    return this.facturaRepository.updateAll(factura, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuFacturaId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/factura/{id}')
  @response(200, {
    description: 'Factura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Factura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Factura, {exclude: 'where'}) filter?: FilterExcludingWhere<Factura>
  ): Promise<Factura> {
    return this.facturaRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuFacturaId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/factura/{id}')
  @response(204, {
    description: 'Factura PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Factura,
  ): Promise<void> {
    await this.facturaRepository.updateById(id, factura);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuFacturaId, ConfiguracionSeguridad.editarAccion]
  })
  @put('/factura/{id}')
  @response(204, {
    description: 'Factura PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() factura: Factura,
  ): Promise<void> {
    await this.facturaRepository.replaceById(id, factura);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuFacturaId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/factura/{id}')
  @response(204, {
    description: 'Factura DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facturaRepository.deleteById(id);
  }
}
