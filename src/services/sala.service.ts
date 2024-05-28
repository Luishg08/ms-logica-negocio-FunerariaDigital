import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Sala} from '../models';
import {repository} from '@loopback/repository';
import {SalaRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class SalaService {
  constructor(
    @repository(SalaRepository)
    private repositorioSala: SalaRepository
  ) {}

  async ObtenerSalasDeUnaSede(idSede: number): Promise<Sala[]|null> {
    try{
      let salas: any = await this.repositorioSala.find({
        where: {
          sedeId: idSede
        }
      })
      return salas
    }
    catch(e){
      return null
    }
  }
}
