import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';

@model()
export class Departamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idDepartamento: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Ciudad)
  ciudades: Ciudad[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
