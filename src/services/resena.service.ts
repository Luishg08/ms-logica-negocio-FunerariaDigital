import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ServicioFunerarioRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ResenaService {
  constructor(@repository(ServicioFunerarioRepository)
  public servicioFunerarioRepository: ServicioFunerarioRepository) { }



  async ObtenerClientePorIdServicioFunerario(idServicioFunerario: number): Promise<any> {
    try {
      let servicioFunerario: any = await this.servicioFunerarioRepository.findById(idServicioFunerario, {
        include: [{
          relation: 'servicioFunerarioBeneficiario'
        }]
      })
      let clienteId: number = servicioFunerario.servicioFunerarioBeneficiario.clienteId;
      console.log(clienteId + "Este es el id del cliente");
      return clienteId;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async VerificarSiClienteYaPuedeResenar(idServicioFunerario: number): Promise<boolean> {
    try {
      let servicioFunerario: any = await this.servicioFunerarioRepository.findById(idServicioFunerario)
      let fechaActual = new Date();
      let fechaSalida = servicioFunerario.fecha_hora_salida;
      console.log(fechaSalida + "Fecha de salida" + "tipo de dato: " + typeof (fechaSalida));
      console.log(fechaActual + "Fecha Actual" + "tipo de dato: " + typeof (fechaSalida));
      if (fechaActual > fechaSalida) {
        console.log("El cliente ya puede resenar");
        return true;
      }
      else {
        return false
      }

    } catch (error) {

      return false;
    }
  }
}
