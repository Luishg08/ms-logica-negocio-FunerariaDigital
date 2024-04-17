import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Sala} from './sala.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_sede_ciudad: {
          name: 'fk_sede_ciudad',
          entity: 'Ciudad',
          entityKey: 'idCiudad',
          foreignKey: 'ciudadId',
        },
      },
    },
  }
)
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
