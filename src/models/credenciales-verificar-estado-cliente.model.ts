import {Entity, model, property} from '@loopback/repository';

@model()
export class CredencialesVerificarEstadoCliente extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;


  constructor(data?: Partial<CredencialesVerificarEstadoCliente>) {
    super(data);
  }
}

export interface CredencialesVerificarEstadoClienteRelations {
  // describe navigational properties here
}

export type CredencialesVerificarEstadoClienteWithRelations = CredencialesVerificarEstadoCliente & CredencialesVerificarEstadoClienteRelations;
