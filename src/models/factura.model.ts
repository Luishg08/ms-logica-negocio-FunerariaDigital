import {Entity, model, property} from '@loopback/repository';

@model()
export class Factura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idFactura: number;

  @property({
    type: 'number',
    required: true,
  })
  precioTotal: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaFacturacion: string;


  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
