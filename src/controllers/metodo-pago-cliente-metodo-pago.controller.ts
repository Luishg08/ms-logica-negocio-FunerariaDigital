import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MetodoPagoCliente,
  MetodoPago,
} from '../models';
import {MetodoPagoClienteRepository} from '../repositories';

export class MetodoPagoClienteMetodoPagoController {
  constructor(
    @repository(MetodoPagoClienteRepository)
    public metodoPagoClienteRepository: MetodoPagoClienteRepository,
  ) { }

  @get('/metodo-pago-clientes/{id}/metodo-pago', {
    responses: {
      '200': {
        description: 'MetodoPago belonging to MetodoPagoCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MetodoPago),
          },
        },
      },
    },
  })
  async getMetodoPago(
    @param.path.number('id') id: typeof MetodoPagoCliente.prototype.idMetodoPagoCliente,
  ): Promise<MetodoPago> {
    return this.metodoPagoClienteRepository.metodoPago(id);
  }
}
