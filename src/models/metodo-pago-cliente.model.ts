import {Entity, hasMany, model, property} from '@loopback/repository';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys: [
      {
        fk_metodoPagoCliente_clienteId: {
          name: 'fk_metodoPagoCliente_clienteId',
          entity: 'Cliente',
          entityKey: 'idCliente',
          foreignKey: 'clienteId'
        }
      },
      {
        fk_metodoPagoCliente_metodoPagoId: {
          name: 'fk_metodoPagoCliente_metodoPagoId',
          entity: 'MetodoPago',
          entityKey: 'idMetodoPago',
          foreignKey: 'metodoPagoId'
        }
      }
    ]
  }
})
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
