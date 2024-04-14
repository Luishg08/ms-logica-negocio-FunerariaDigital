import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Sala} from './sala.model';

@model()
export class ServicioFunerario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_servicio_funerario: number;

  @property({
    type: 'string',
    required: true,
  })
  ubicacion_cuerpo: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_sepultura: string;

  @property({
    type: 'boolean',
    required: true,
  })
  servicio_traslado: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fecha_hora_ingreso: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_hora_salida: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_unico: string;

  @property({
    type: 'boolean',
    required: true,
  })
  notificado: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  estado_codigo_unico: boolean;

  @belongsTo(() => Sala)
  salaId: number;

  constructor(data?: Partial<ServicioFunerario>) {
    super(data);
  }
}

export interface ServicioFunerarioRelations {
  // describe navigational properties here
}

export type ServicioFunerarioWithRelations = ServicioFunerario & ServicioFunerarioRelations;
