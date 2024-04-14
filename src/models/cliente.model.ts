import {Entity, model, property, hasMany} from '@loopback/repository';
import {MetodoPago} from './metodo-pago.model';
import {MetodoPagoCliente} from './metodo-pago-cliente.model';

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
    type: 'number',
    required: true,
  })
  id_usuario: number;

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

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
