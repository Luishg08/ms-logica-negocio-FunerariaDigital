import {Entity, model, property} from '@loopback/repository';

@model()
export class CategoriaPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idCategoria?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<CategoriaPlan>) {
    super(data);
  }
}

export interface CategoriaPlanRelations {
  // describe navigational properties here
}

export type CategoriaPlanWithRelations = CategoriaPlan & CategoriaPlanRelations;
