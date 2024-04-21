import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PagoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class PagoService {
  constructor(/* Add @inject to inject parameters */
    @repository(PagoRepository)
    public resenaRepository: PagoRepository,
  ) { }

  /*
   * Add service methods here
   */
  async ObtenerPagosDeUnCliente(idCliente: number): Promise<any[] | null> {
    try {
      let pagosDeUnCliente: any[] = await this.resenaRepository.find({
        include: [{
          relation: 'metodoPagoCliente',
          scope: {
            include: [{
              relation: 'miCliente',
              scope: {
                where: {
                  id_cliente: idCliente
                }
              }
            }]
          },
        },
        {relation: 'factura'}
        ]
      })
      console.log(pagosDeUnCliente);
      pagosDeUnCliente = pagosDeUnCliente.filter((pagos) => pagos.metodoPagoCliente.miCliente != undefined)
      return pagosDeUnCliente
    } catch (error) {
      console.log(error);

      return null
    }
  }
}
