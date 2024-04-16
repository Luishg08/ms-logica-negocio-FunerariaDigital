import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {ClientePlan} from './cliente-plan.model';
import {ServicioPlan} from './servicio-plan.model';
import {PlanServicioPlan} from './plan-servicio-plan.model';

@model(/*{
  settings: {
    foreignKeys: {
      fk_plan_id: {
        name: 'fk_plan_id',
        entity: 'Plan'
      }
    }
  }
}*/)
export class Plan extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  mensualidad: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad_beneficiarios: number;

  @hasMany(() => Cliente, {through: {model: () => ClientePlan}})
  clientes: Cliente[];

  @hasMany(() => ServicioPlan, {through: {model: () => PlanServicioPlan}})
  servicios: ServicioPlan[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
