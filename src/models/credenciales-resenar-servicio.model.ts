import {model, property} from '@loopback/repository';
import {Resena} from '.';

@model()
export class CredencialesResenarServicio extends Resena {
  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;


  constructor(data?: Partial<CredencialesResenarServicio>) {
    super(data);
  }
}

export interface CredencialesResenarServicioRelations {
  // describe navigational properties here
}

export type CredencialesResenarServicioWithRelations = CredencialesResenarServicio & CredencialesResenarServicioRelations;
