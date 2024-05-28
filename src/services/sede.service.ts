import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {SedeRepository} from '../repositories';
import {Sede} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class SedeService {
  constructor(@repository(SedeRepository)
    private repositorioSede: SedeRepository
  ) {}



  async ObtenerSedesDeUnaCiudad(idCiudad: number): Promise<Sede[]|null> {
    try{
      let sedes: any = await this.repositorioSede.find({
        where: {
          ciudadId: idCiudad
        }
      })
      return sedes
    }
    catch(e){
      return null
    }
  }
}
