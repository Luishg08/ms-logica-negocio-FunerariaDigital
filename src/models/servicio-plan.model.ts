import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plan} from './plan.model';
import {PlanServicioPlan} from './plan-servicio-plan.model';

@model()
export class ServicioPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  detalles: string;

  @hasMany(() => Plan, {through: {model: () => PlanServicioPlan}})
  planes: Plan[];

  constructor(data?: Partial<ServicioPlan>) {
    super(data);
  }
}

export interface ServicioPlanRelations {
  // describe navigational properties here
}

export type ServicioPlanWithRelations = ServicioPlan & ServicioPlanRelations;
