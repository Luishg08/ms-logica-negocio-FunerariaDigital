import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {BeneficiarioRepository, SalaRepository, ServicioFunerarioRepository} from '../repositories';
const generator = require('generate-password');

@injectable({scope: BindingScope.TRANSIENT})
export class ServicioFunerarioService {
  constructor(@repository(BeneficiarioRepository)
  public beneficiarioRepository: BeneficiarioRepository,
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
    @repository(SalaRepository)
    public salaRepository: SalaRepository,
  ) { }

  /*
   * Add service methods here
   */


  /**
   * Crear una clave aleatoria
   * @returns cadena aleatoria de n caracteres
   */
  crearTextoAleatorio(n: number): string {
    let clave = generator.generate({
      length: n,
      numbers: true
    });
    return clave;
  }

  async ObtenerClienteyEstadodelBeneficiario(beneficiarioId: number): Promise<any> {
    try {
      let beneficiario: any = await this.beneficiarioRepository.findById(beneficiarioId, {
        include: [{
          relation: 'clienteBeneficiario'
        },
        {
          relation: 'estadoDeBeneficiario'
        }]
      });
      return beneficiario;
    }
    catch (error) {
      return null;
    }
  }

  async ConsultarServicioConMismoHorarioYSala(idSala: number, fecha_hora_ingreso: string, fecha_hora_salida: string): Promise<any> {
    let servicioYaCreado = await this.servicioFunerarioRepository.findOne({
      where: {
        salaId: idSala,
        fecha_hora_ingreso: fecha_hora_ingreso,
        fecha_hora_salida: fecha_hora_salida
      }
    })
    return servicioYaCreado;
  }

  async ObtenerSalaConSedeYCiudad(idSala: number): Promise<any> {
    try {
      let sala: any = await this.salaRepository.findById(idSala, {
        include: [
          {
            relation: 'sede',
            scope: {
              include: [{relation: 'ciudad'}]
            }
          }
        ]
      });
      return sala;
    }
    catch (error) {
      return null;
    }
  }
}
