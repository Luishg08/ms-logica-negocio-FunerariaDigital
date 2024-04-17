import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
      foreignKeys: {
        fk_clienteId: {
          name: 'fk_clienteId',
          entity: 'Cliente',
          entityKey: 'id_cliente',
          foreignKey: 'clienteId',
        },
        fk_planId: {
          name: 'fk_planId',
          entity: 'Plan',
          entityKey: 'id',
          foreignKey: 'planId',
        },
      },
    },
  },
)
export class ClientePlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idClientePlan?: number;

  @property({
    type: 'number',
    required: true,
  })
  tarifa: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaContrato: string;

  @property({
    type: 'number',
  })
  clienteId?: number;

  @property({
    type: 'number',
  })
  planId?: number;

  constructor(data?: Partial<ClientePlan>) {
    super(data);
  }
}

export interface ClientePlanRelations {
  // describe navigational properties here
}

export type ClientePlanWithRelations = ClientePlan & ClientePlanRelations;
