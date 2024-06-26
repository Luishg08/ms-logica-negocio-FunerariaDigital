import {Entity, belongsTo, model, property} from '@loopback/repository';
import {ServicioFunerario} from './servicio-funerario.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_resena_servicio_funerario: {
          name: 'fk_resena_servicio_funerario',
          entity: 'ServicioFunerario',
          entityKey: 'id_servicio_funerario',
          foreignKey: 'servicioFunerarioId',
        },
      },
    },
  }
)
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
  fechaResena: Date;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @property({
    type: 'string',
  })
  comentario?: string;

  @belongsTo(() => ServicioFunerario)
  servicioFunerarioId: number;

  constructor(data?: Partial<Resena>) {
    super(data);
  }
}

export interface ResenaRelations {
  // describe navigational properties here
}

export type ResenaWithRelations = Resena & ResenaRelations;
