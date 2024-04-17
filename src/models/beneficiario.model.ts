import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {EstadoBeneficiario} from './estado-beneficiario.model';
import {ServicioFunerario} from './servicio-funerario.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_beneficiario_estado: {
          name: 'fk_beneficiario_estado',
          entity: 'EstadoBeneficiario',
          entityKey: 'id_estado',
          foreignKey: 'estadoId',
        },
        fk_beneficiario_cliente: {
          name: 'fk_beneficiario_cliente',
          entity: 'Cliente',
          entityKey: 'id_cliente',
          foreignKey: 'clienteId',
        },
      },
    },
  }
)
export class Beneficiario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_beneficiario: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_registro: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  celular?: string;

  @hasMany(() => ServicioFunerario)
  servicioFunerarios: ServicioFunerario[];

  @belongsTo(() => EstadoBeneficiario, {name: 'estadoDeBeneficiario'})
  estadoId: number;

  @belongsTo(() => Cliente, {name: 'clienteBeneficiario'})
  clienteId: number;

  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;
