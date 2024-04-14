import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {MetodoPagoCliente} from './metodo-pago-cliente.model';

@model()
export class MetodoPago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: true,
  })
  idMetodoPago: number;

  @property({
    type: 'string',
    required: true,
  })
  tipoPago: string;

  @hasMany(() => Cliente, {through: {model: () => MetodoPagoCliente}})
  clientes: Cliente[];

  constructor(data?: Partial<MetodoPago>) {
    super(data);
  }
}

export interface MetodoPagoRelations {
  // describe navigational properties here
}

export type MetodoPagoWithRelations = MetodoPago & MetodoPagoRelations;
