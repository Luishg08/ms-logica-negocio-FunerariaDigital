import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesObtenerCiudadesDepartamento extends Model {
  @property({
    type: 'number',
    required: true,
  })
  idDepartamento: number;


  constructor(data?: Partial<CredencialesObtenerCiudadesDepartamento>) {
    super(data);
  }
}

export interface CredencialesObtenerCiudadesDepartamentoRelations {
  // describe navigational properties here
}

export type CredencialesObtenerCiudadesDepartamentoWithRelations = CredencialesObtenerCiudadesDepartamento & CredencialesObtenerCiudadesDepartamentoRelations;
