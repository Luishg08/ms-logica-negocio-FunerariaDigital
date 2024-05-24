import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {BeneficiarioRepository, CiudadRepository, ResenaRepository, SalaRepository, ServicioFunerarioRepository} from '../repositories';
const generator = require('generate-password');

@injectable({scope: BindingScope.TRANSIENT})
export class ServicioFunerarioService {
  constructor(@repository(BeneficiarioRepository)
  public beneficiarioRepository: BeneficiarioRepository,
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
    @repository(SalaRepository)
    public salaRepository: SalaRepository,
    @repository(ResenaRepository)
    public resenaRepository: ResenaRepository,
    @repository(CiudadRepository)
    public ciudadRepository: CiudadRepository
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

  async ConsultarServicioConMismoHorarioYSala(idSala: number, fecha_hora_ingreso: Date, fecha_hora_salida: Date): Promise<any> {
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

  async ObtenerReseñasConServiciosFunerarios(idCliente: number): Promise<any[] | null> {
    try {
      let reseñasDeMisServicios: any[] = await this.resenaRepository.find({
        include: [{
          relation: 'servicioFunerario',
          scope: {
            include: [{
              relation: 'servicioFunerarioBeneficiario',
              scope: {
                where: {
                  clienteId: idCliente
                }
              }
            }]

          }
        }]
      })
      console.log(reseñasDeMisServicios);
      reseñasDeMisServicios = reseñasDeMisServicios.filter((resena) => resena.servicioFunerario.servicioFunerarioBeneficiario != undefined)
      return reseñasDeMisServicios
    } catch (error) {
      console.log(error);

      return null
    }
  }

  async ObtenerCiudadUbicacionCuerpo(idCiudad: number) {
    try {
      let ciudad = await this.ciudadRepository.findById(idCiudad)
      return ciudad
    }
    catch (error) {
      return null
    }
  }
}
