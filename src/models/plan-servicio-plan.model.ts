import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
      foreignKeys: {
        fk_servicio_plan_id: {
          name: 'fk_servicio_plan_id',
          entity: 'ServicioPlan',
          entityKey: 'id',
          foreignKey: 'servicioPlanId',
        },
        fk_plan_id: {
          name: 'fk_plan_id',
          entity: 'Plan',
          entityKey: 'id',
          foreignKey: 'planId',
        },
      },
    },
  }
)
export class PlanServicioPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idServicioPlan?: number;

  @property({
    type: 'number',
  })
  planId?: number;

  @property({
    type: 'number',
  })
  servicioPlanId?: number;

  constructor(data?: Partial<PlanServicioPlan>) {
    super(data);
  }
}

export interface PlanServicioPlanRelations {
  // describe navigational properties here
}

export type PlanServicioPlanWithRelations = PlanServicioPlan & PlanServicioPlanRelations;
