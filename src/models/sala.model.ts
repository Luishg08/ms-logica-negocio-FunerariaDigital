import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Sede} from './sede.model';
import {ServicioFunerario} from './servicio-funerario.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_sala_sede: {
          name: 'fk_sala_sede',
          entity: 'Sede',
          entityKey: 'idSede',
          foreignKey: 'sedeId',
        },
      },
    },
  }
)
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
