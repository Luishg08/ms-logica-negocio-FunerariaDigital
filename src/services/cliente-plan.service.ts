import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cliente} from '../models';
import {ClientePlanRepository, ClienteRepository} from '../repositories';


@injectable({scope: BindingScope.TRANSIENT})
export class ClientePlanService {
  constructor(
    @repository(ClienteRepository)
    private clienteRepository: ClienteRepository,
    @repository(ClientePlanRepository)
    private clientePlanRepository: ClientePlanRepository
  ) { }

  async obtenerClienteConIdUsuario(idUsuario: string): Promise<Cliente | null> {
    try {
      let cliente = await this.clienteRepository.findOne({
        where: {
          id_usuario: idUsuario,
        }
      });
      console.log(cliente);
      return cliente;
    } catch (err) {
      console.log(err);
      return null;
    }
  }


  async verificarEstadoClientePlan(idCliente: number): Promise<boolean> {
    let clientePlan: any = await this.clientePlanRepository.findOne({
      where: {
        clienteId: idCliente,
        estadoClientePlan: true
      }
    });
    console.log(clientePlan);
    let fechaContrato = clientePlan.fechaContrato;
    console.log("Fecha de contrato: " + fechaContrato);

    if (!(fechaContrato > new Date())) {
      clientePlan.estadoClientePlan = false;
      this.clientePlanRepository.updateById(clientePlan.idClientePlan, clientePlan);
      console.log("El plan del cliente ha expirado");
      return false
    }
    return true;

  }
}
