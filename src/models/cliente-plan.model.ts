import {Entity, model, property} from '@loopback/repository';

@model()
export class ClientePlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idClientePlan?: number;

  @property({
    type: 'number',
    required: true,
  })
  tarifa: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaContrato: string;


  constructor(data?: Partial<ClientePlan>) {
    super(data);
  }
}

export interface ClientePlanRelations {
  // describe navigational properties here
}

export type ClientePlanWithRelations = ClientePlan & ClientePlanRelations;
