import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {Sala} from './sala.model';

@model({
  settings: {
    foreignKeys: [
      {
        fk_servicioFunerario_BeneficiarioId: {
          name: 'fk_servicioFunerario_BeneficiarioId',
          entity: 'Beneficiario',
          entityKey: 'id_beneficiario',
          foreignKey: 'id_beneficiario'
        }
      }
    ]
  }
})
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

  @belongsTo(() => Beneficiario, {name: 'servicioFunerarioBeneficiario'})
  id_beneficiario: number;

  constructor(data?: Partial<ServicioFunerario>) {
    super(data);
  }
}

export interface ServicioFunerarioRelations {
  // describe navigational properties here
}

export type ServicioFunerarioWithRelations = ServicioFunerario & ServicioFunerarioRelations;
