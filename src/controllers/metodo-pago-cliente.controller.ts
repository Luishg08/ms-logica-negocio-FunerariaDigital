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
MetodoPago,
MetodoPagoCliente,
Cliente,
} from '../models';
import {MetodoPagoRepository} from '../repositories';

export class MetodoPagoClienteController {
  constructor(
    @repository(MetodoPagoRepository) protected metodoPagoRepository: MetodoPagoRepository,
  ) { }

  @get('/metodo-pagos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of MetodoPago has many Cliente through MetodoPagoCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.metodoPagoRepository.clientes(id).find(filter);
  }

  @post('/metodo-pagos/{id}/clientes', {
    responses: {
      '200': {
        description: 'create a Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MetodoPago.prototype.idMetodoPago,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInMetodoPago',
            exclude: ['id_cliente'],
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id_cliente'>,
  ): Promise<Cliente> {
    return this.metodoPagoRepository.clientes(id).create(cliente);
  }

  @patch('/metodo-pagos/{id}/clientes', {
    responses: {
      '200': {
        description: 'MetodoPago.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.metodoPagoRepository.clientes(id).patch(cliente, where);
  }

  @del('/metodo-pagos/{id}/clientes', {
    responses: {
      '200': {
        description: 'MetodoPago.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.metodoPagoRepository.clientes(id).delete(where);
  }
}
