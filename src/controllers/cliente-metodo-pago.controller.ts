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
Cliente,
MetodoPagoCliente,
MetodoPago,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteMetodoPagoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many MetodoPago through MetodoPagoCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MetodoPago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MetodoPago>,
  ): Promise<MetodoPago[]> {
    return this.clienteRepository.metodosdepago(id).find(filter);
  }

  @post('/clientes/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'create a MetodoPago model instance',
        content: {'application/json': {schema: getModelSchemaRef(MetodoPago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id_cliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {
            title: 'NewMetodoPagoInCliente',
            exclude: ['idMetodoPago'],
          }),
        },
      },
    }) metodoPago: Omit<MetodoPago, 'idMetodoPago'>,
  ): Promise<MetodoPago> {
    return this.clienteRepository.metodosdepago(id).create(metodoPago);
  }

  @patch('/clientes/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Cliente.MetodoPago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPago, {partial: true}),
        },
      },
    })
    metodoPago: Partial<MetodoPago>,
    @param.query.object('where', getWhereSchemaFor(MetodoPago)) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.clienteRepository.metodosdepago(id).patch(metodoPago, where);
  }

  @del('/clientes/{id}/metodo-pagos', {
    responses: {
      '200': {
        description: 'Cliente.MetodoPago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MetodoPago)) where?: Where<MetodoPago>,
  ): Promise<Count> {
    return this.clienteRepository.metodosdepago(id).delete(where);
  }
}
