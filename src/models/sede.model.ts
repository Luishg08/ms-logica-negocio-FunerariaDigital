import {Entity, model, property} from '@loopback/repository';

@model()
export class Sede extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idSede?: number;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  cantidad_salas: string;


  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
