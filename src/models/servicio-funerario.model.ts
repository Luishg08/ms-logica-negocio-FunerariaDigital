import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {Sala} from './sala.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_servicio_funerario_beneficiario: {
          name: 'fk_servicio_funerario_beneficiario',
          entity: 'Beneficiario',
          entityKey: 'id_beneficiario',
          foreignKey: 'beneficiarioId',
        },
        fk_servicio_funerario_sala: {
          name: 'fk_servicio_funerario_sala',
          entity: 'Sala',
          entityKey: 'idSala',
          foreignKey: 'salaId',
        },
      },
      strict: false
    },
  }
)
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
    type: 'string',
    required: true,
  })
  fecha_hora_ingreso: string;

  @property({
    type: 'string',
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

  @belongsTo(() => Beneficiario, {name: 'servicioFunerarioBeneficiario'})
  beneficiarioId: number;

  constructor(data?: Partial<ServicioFunerario>) {
    super(data);
  }
}

export interface ServicioFunerarioRelations {
  // describe navigational properties here
}

export type ServicioFunerarioWithRelations = ServicioFunerario & ServicioFunerarioRelations;
