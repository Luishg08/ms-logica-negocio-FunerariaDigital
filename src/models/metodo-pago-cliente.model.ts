import {Entity, hasMany, model, property} from '@loopback/repository';
import {Pago} from './pago.model';

@model(
  {
    settings: {
      foreignKeys: {
        fk_cliente_id: {
          name: 'fk_cliente_id',
          entity: 'Cliente',
          entityKey: 'id_cliente',
          foreignKey: 'clienteId',
        },
        fk_metodo_pago_id: {
          name: 'fk_metodo_pago_id',
          entity: 'MetodoPago',
          entityKey: 'idMetodoPago',
          foreignKey: 'metodoPagoId',
        },
      },
    },
  },
)
export class MetodoPagoCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: true,
  })
  idMetodoPagoCliente: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  datos?: string;

  @property({
    type: 'number',
  })
  clienteId?: number;

  @property({
    type: 'number',
  })
  metodoPagoId?: number;

  @hasMany(() => Pago)
  pagos: Pago[];

  constructor(data?: Partial<MetodoPagoCliente>) {
    super(data);
  }
}

export interface MetodoPagoClienteRelations {
  // describe navigational properties here
}

export type MetodoPagoClienteWithRelations = MetodoPagoCliente & MetodoPagoClienteRelations;
