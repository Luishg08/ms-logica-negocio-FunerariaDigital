import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cliente, ClientePlan} from '../models';
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

  async obtenerClienteConCorreo(correo: string): Promise<Cliente | null> {
    try {
      let cliente = await this.clienteRepository.findOne({
        where: {
          correo: correo,
        }
      });
      console.log(cliente);
      return cliente;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async verificarEstadoClientePlan(idCliente: number): Promise<boolean | ClientePlan> {
    let clientePlan: any = await this.clientePlanRepository.findOne({
      where: {
        clienteId: idCliente,
        estadoClientePlan: true
      }
    });
    if (clientePlan != null) {
      console.log(clientePlan);
      let fechaContrato = clientePlan.fechaContrato;
      console.log("Fecha de contrato: " + fechaContrato);

      if (!(fechaContrato > new Date())) {
        clientePlan.estadoClientePlan = false;
        this.clientePlanRepository.updateById(clientePlan.idClientePlan, clientePlan);
        console.log("El plan del cliente ha expirado");
        return false
      }
      return clientePlan
    }
    else {
      return false
    }
  }
}
