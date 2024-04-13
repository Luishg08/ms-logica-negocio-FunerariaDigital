import {Entity, model, property} from '@loopback/repository';

@model()
export class Sala extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idSala: number;

  @property({
    type: 'string',
    required: true,
  })
  numero_sala: string;

  @property({
    type: 'string',
    required: true,
  })
  capacidad: string;


  constructor(data?: Partial<Sala>) {
    super(data);
  }
}

export interface SalaRelations {
  // describe navigational properties here
}

export type SalaWithRelations = Sala & SalaRelations;
