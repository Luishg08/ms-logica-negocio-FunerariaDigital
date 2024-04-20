import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {ServicioFunerario} from './servicio-funerario.model';
import {Sede} from './sede.model';

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

  @hasMany(() => ServicioFunerario)
  serviciosFunerarios: ServicioFunerario[];

  @belongsTo(() => Sede)
  sedeId: number;

  constructor(data?: Partial<Sala>) {
    super(data);
  }
}

export interface SalaRelations {
  // describe navigational properties here
}

export type SalaWithRelations = Sala & SalaRelations;
