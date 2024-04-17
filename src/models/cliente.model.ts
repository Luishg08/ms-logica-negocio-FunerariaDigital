import {Entity, hasMany, model, property} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {ClientePlan} from './cliente-plan.model';
import {MetodoPagoCliente} from './metodo-pago-cliente.model';
import {MetodoPago} from './metodo-pago.model';
import {Plan} from './plan.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_cliente: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado_cliente: boolean;

  @property({
    type: 'string',
    required: true,
  })
  id_usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @hasMany(() => MetodoPago, {through: {model: () => MetodoPagoCliente}})
  metodosdepago: MetodoPago[];

  @hasMany(() => Plan, {through: {model: () => ClientePlan}})
  plans: Plan[];

  @hasMany(() => Beneficiario)
  beneficiarios: Beneficiario[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
