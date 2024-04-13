import {Entity, model, property} from '@loopback/repository';

@model()
export class Resena extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idResena: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaResena: string;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @property({
    type: 'string',
  })
  comentario?: string;


  constructor(data?: Partial<Resena>) {
    super(data);
  }
}

export interface ResenaRelations {
  // describe navigational properties here
}

export type ResenaWithRelations = Resena & ResenaRelations;
