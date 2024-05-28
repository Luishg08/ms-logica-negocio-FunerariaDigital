import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesObtenerClienteConCorreo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  correo: string;


  constructor(data?: Partial<CredencialesObtenerClienteConCorreo>) {
    super(data);
  }
}

export interface CredencialesObtenerClienteConCorreoRelations {
  // describe navigational properties here
}

export type CredencialesObtenerClienteConCorreoWithRelations = CredencialesObtenerClienteConCorreo & CredencialesObtenerClienteConCorreoRelations;
