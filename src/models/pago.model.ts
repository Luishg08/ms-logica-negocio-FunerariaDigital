import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Factura} from './factura.model';
import {MetodoPagoCliente} from './metodo-pago-cliente.model';

@model({
  settings: {
    foreignKeys: [
      {
        fk_pago_metodoPagoClienteId: {
          name: 'fk_pago_metodoPagoClienteId',
          entity: 'MetodoPagoCliente',
          entityKey: 'idMetodoPagoCliente',
          foreignKey: 'metodoPagoClienteId'
        },

        fk_pago_facturaId: {
          name: 'fk_pago_facturaId',
          entity: 'Factura',
          entityKey: 'idFactura',
          foreignKey: 'facturaId'
        }
      }
    ]
  }
})
export class Pago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: true,
  })
  idPago: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaPago: string;

  @belongsTo(() => MetodoPagoCliente)
  metodoPagoClienteId: number;

  @hasOne(() => Factura)
  factura: Factura;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
