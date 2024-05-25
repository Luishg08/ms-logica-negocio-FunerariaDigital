import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesPlanCategoria extends Model {
  @property({
    type: 'number',
    required: true,
  })
  idPlan: number;


  constructor(data?: Partial<CredencialesPlanCategoria>) {
    super(data);
  }
}

export interface CredencialesPlanCategoriaRelations {
  // describe navigational properties here
}

export type CredencialesPlanCategoriaWithRelations = CredencialesPlanCategoria & CredencialesPlanCategoriaRelations;
