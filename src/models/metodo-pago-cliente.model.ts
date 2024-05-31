import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Pago} from './pago.model';
import {MetodoPago} from './metodo-pago.model';

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
    type: 'string',
  })
  cvv: string;
  @hasMany(() => Pago)
  pagos: Pago[];

  @belongsTo(() => Cliente, {name: 'miCliente'})
  clienteId: number;

  @belongsTo(() => MetodoPago)
  metodoPagoId: number;

  constructor(data?: Partial<MetodoPagoCliente>) {
    super(data);
  }
}

export interface MetodoPagoClienteRelations {
  // describe navigational properties here
}

export type MetodoPagoClienteWithRelations = MetodoPagoCliente & MetodoPagoClienteRelations;
