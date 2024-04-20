import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {
  Cliente,
  CredencialesVerificarEstadoCliente,
  Plan
} from '../models';
import {ClienteRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { ConfiguracionSeguridad } from '../config/configuracion.seguridad';
import { ClientePlanService } from '../services';

export class ClientePlanController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
    @service(ClientePlanService)
    public clientePlanService: ClientePlanService
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClientePlanId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Plan through ClientePlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.clienteRepository.plans(id).find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClientePlanId, ConfiguracionSeguridad.guardarAccion]

  })

  @post('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'create a Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id_cliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInCliente',
            exclude: ['id'],
          }),
        },
      },
    }) plan: Omit<Plan, 'id'>,
  ): Promise<Plan> {
    return this.clienteRepository.plans(id).create(plan);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClientePlanId, ConfiguracionSeguridad.editarAccion]

  })

  @patch('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Cliente.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.clienteRepository.plans(id).patch(plan, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClientePlanId, ConfiguracionSeguridad.eliminarAccion]

  })

  @del('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Cliente.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.clienteRepository.plans(id).delete(where);
  }
  @post('/verificar-estado-cliente')
  @response(200, {
    description: "Proceso de solicitud de un servicio por parte de un cliente",
    content: {'application/json': {schema: getModelSchemaRef(CredencialesVerificarEstadoCliente)}}
  })
  async verificarEstadoCliente(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(CredencialesVerificarEstadoCliente)
          }
        }
      }
    )
    datos: CredencialesVerificarEstadoCliente
  ): Promise<Object> {
    let cliente = await this.clientePlanService.obtenerClienteConIdUsuario(datos.idUsuario)
    if (cliente) {
      let respuesta = await this.clientePlanService.verificarEstadoClientePlan(cliente.id_cliente)
      if (respuesta) {
        return new HttpErrors[401]("El plan del cliente esta activo");
      }
      else {
        cliente.estado_cliente = false;
        this.clienteRepository.updateById(cliente.id_cliente, cliente);
        return new HttpErrors[401]("El plan del cliente ha expirado");
      }
    } else {
      return new HttpErrors[401]("El usuario no tiene un cliente asignado");
    }
  }
}
