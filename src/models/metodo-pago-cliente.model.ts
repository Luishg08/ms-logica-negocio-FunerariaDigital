import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<MetodoPagoCliente>) {
    super(data);
  }
}

export interface MetodoPagoClienteRelations {
  // describe navigational properties here
}

export type MetodoPagoClienteWithRelations = MetodoPagoCliente & MetodoPagoClienteRelations;
