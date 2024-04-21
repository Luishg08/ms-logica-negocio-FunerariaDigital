import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesCambiarEstadoBeneficiario extends Model {
  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoNuevo: string;

  @property({
    type: 'number',
    required: true,
  })
  idBeneficiario: number;


  constructor(data?: Partial<CredencialesCambiarEstadoBeneficiario>) {
    super(data);
  }
}

export interface CredencialesCambiarEstadoBeneficiarioRelations {
  // describe navigational properties here
}

export type CredencialesCambiarEstadoBeneficiarioWithRelations = CredencialesCambiarEstadoBeneficiario & CredencialesCambiarEstadoBeneficiarioRelations;
