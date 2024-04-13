import {Entity, model, property} from '@loopback/repository';

@model()
export class PlanServicioPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idServicioPlan?: number;


  constructor(data?: Partial<PlanServicioPlan>) {
    super(data);
  }
}

export interface PlanServicioPlanRelations {
  // describe navigational properties here
}

export type PlanServicioPlanWithRelations = PlanServicioPlan & PlanServicioPlanRelations;
