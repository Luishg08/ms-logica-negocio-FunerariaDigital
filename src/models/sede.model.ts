import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Sala} from './sala.model';

@model()
export class Sede extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idSede: number;

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

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => Sala)
  salas: Sala[];

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
