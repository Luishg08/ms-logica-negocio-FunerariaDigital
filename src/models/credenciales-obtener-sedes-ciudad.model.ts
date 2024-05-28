import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesObtenerSedesCiudad extends Model {
  @property({
    type: 'number',
    required: true,
  })
  idCiudad: number;


  constructor(data?: Partial<CredencialesObtenerSedesCiudad>) {
    super(data);
  }
}

export interface CredencialesObtenerSedesCiudadRelations {
  // describe navigational properties here
}

export type CredencialesObtenerSedesCiudadWithRelations = CredencialesObtenerSedesCiudad & CredencialesObtenerSedesCiudadRelations;
