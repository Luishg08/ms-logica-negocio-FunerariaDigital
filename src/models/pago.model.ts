import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {MetodoPagoCliente} from './metodo-pago-cliente.model';
import {Factura} from './factura.model';

@model()
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
