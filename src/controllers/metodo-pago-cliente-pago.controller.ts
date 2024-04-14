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
  MetodoPagoCliente,
  Pago,
} from '../models';
import {MetodoPagoClienteRepository} from '../repositories';

export class MetodoPagoClientePagoController {
  constructor(
    @repository(MetodoPagoClienteRepository) protected metodoPagoClienteRepository: MetodoPagoClienteRepository,
  ) { }

  @get('/metodo-pago-clientes/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of MetodoPagoCliente has many Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.metodoPagoClienteRepository.pagos(id).find(filter);
  }

  @post('/metodo-pago-clientes/{id}/pagos', {
    responses: {
      '200': {
        description: 'MetodoPagoCliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MetodoPagoCliente.prototype.idMetodoPagoCliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInMetodoPagoCliente',
            exclude: ['idPago'],
            optional: ['metodoPagoClienteId']
          }),
        },
      },
    }) pago: Omit<Pago, 'idPago'>,
  ): Promise<Pago> {
    return this.metodoPagoClienteRepository.pagos(id).create(pago);
  }

  @patch('/metodo-pago-clientes/{id}/pagos', {
    responses: {
      '200': {
        description: 'MetodoPagoCliente.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.metodoPagoClienteRepository.pagos(id).patch(pago, where);
  }

  @del('/metodo-pago-clientes/{id}/pagos', {
    responses: {
      '200': {
        description: 'MetodoPagoCliente.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.metodoPagoClienteRepository.pagos(id).delete(where);
  }
}
