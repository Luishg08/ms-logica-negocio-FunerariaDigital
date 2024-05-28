import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CiudadRepository, SalaRepository} from '../repositories';
import {Ciudad} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class CiudadService {
  constructor(@repository(CiudadRepository)
  private RepositorioCiudad: CiudadRepository) { }



  async ObtenerCiudadesDeUnDepartamento(idDepartamento: number): Promise<Ciudad[]|null> {
    try{
      let ciudades: any = await this.RepositorioCiudad.find({
        where: {
          departamentoId: idDepartamento
        }
      })
      return ciudades
    }
    catch(e){
      return null
    }
  }
}
