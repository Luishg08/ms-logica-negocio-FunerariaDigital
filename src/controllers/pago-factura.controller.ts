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
  Pago,
  Factura,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoFacturaController {
  constructor(
    @repository(PagoRepository) protected pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/factura', {
    responses: {
      '200': {
        description: 'Pago has one Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura> {
    return this.pagoRepository.factura(id).get(filter);
  }

  @post('/pagos/{id}/factura', {
    responses: {
      '200': {
        description: 'Pago model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pago.prototype.idPago,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInPago',
            exclude: ['idFactura'],
            optional: ['pagoId']
          }),
        },
      },
    }) factura: Omit<Factura, 'idFactura'>,
  ): Promise<Factura> {
    return this.pagoRepository.factura(id).create(factura);
  }

  @patch('/pagos/{id}/factura', {
    responses: {
      '200': {
        description: 'Pago.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.pagoRepository.factura(id).patch(factura, where);
  }

  @del('/pagos/{id}/factura', {
    responses: {
      '200': {
        description: 'Pago.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.pagoRepository.factura(id).delete(where);
  }
}
