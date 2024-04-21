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
  Cliente,
} from '../models';
import {MetodoPagoClienteRepository} from '../repositories';

export class MetodoPagoClienteClienteController {
  constructor(
    @repository(MetodoPagoClienteRepository)
    public metodoPagoClienteRepository: MetodoPagoClienteRepository,
  ) { }

  @get('/metodo-pago-clientes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to MetodoPagoCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof MetodoPagoCliente.prototype.idMetodoPagoCliente,
  ): Promise<Cliente> {
    return this.metodoPagoClienteRepository.miCliente(id);
  }
}
