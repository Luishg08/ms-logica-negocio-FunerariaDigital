import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesObtenerSalasSede extends Model {
  @property({
    type: 'number',
    required: true,
  })
  idSede: number;


  constructor(data?: Partial<CredencialesObtenerSalasSede>) {
    super(data);
  }
}

export interface CredencialesObtenerSalasSedeRelations {
  // describe navigational properties here
}

export type CredencialesObtenerSalasSedeWithRelations = CredencialesObtenerSalasSede & CredencialesObtenerSalasSedeRelations;
