import {Entity, model, property} from '@loopback/repository';

@model()
export class Beneficiario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_beneficiario?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_registro: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  celular?: string;


  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;
