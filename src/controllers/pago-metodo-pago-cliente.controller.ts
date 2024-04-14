import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  MetodoPagoCliente,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoMetodoPagoClienteController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/metodo-pago-cliente', {
    responses: {
      '200': {
        description: 'MetodoPagoCliente belonging to Pago',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MetodoPagoCliente),
          },
        },
      },
    },
  })
  async getMetodoPagoCliente(
    @param.path.number('id') id: typeof Pago.prototype.idPago,
  ): Promise<MetodoPagoCliente> {
    return this.pagoRepository.metodoPagoCliente(id);
  }
}
