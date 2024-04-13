import {Entity, model, property} from '@loopback/repository';

@model()
export class ServicioPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idServicio?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  detalles: string;


  constructor(data?: Partial<ServicioPlan>) {
    super(data);
  }
}

export interface ServicioPlanRelations {
  // describe navigational properties here
}

export type ServicioPlanWithRelations = ServicioPlan & ServicioPlanRelations;
