import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {Cliente, CredencialesObtenerClienteConCorreo, CredencialesVerificarEstadoCliente} from '../models';
import {ClienteRepository} from '../repositories';
import {ClientePlanService} from '../services';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(ClientePlanService)
    public clientePlanService: ClientePlanService
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClienteId, ConfiguracionSeguridad.guardarAccion]

  })
  @post('/cliente')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id_cliente'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id_cliente'>,
  ): Promise<Cliente> {
    return this.clienteRepository.create(cliente);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClienteId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/cliente/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClienteId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/cliente')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClienteId, ConfiguracionSeguridad.editarAccion]

  })

  @patch('/cliente')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClienteId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/cliente/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClienteId, ConfiguracionSeguridad.editarAccion]

  })
  @patch('/cliente/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClienteId, ConfiguracionSeguridad.guardarAccion]

  })

  @put('/cliente/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuClienteId, ConfiguracionSeguridad.eliminarAccion]

  })
  @del('/cliente/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }


  @post('/usuario-tiene-cliente')
  @response(200, {
    description: 'Obtener cliente con usuario',
    content: {'application/json': {schema: getModelSchemaRef(CredencialesVerificarEstadoCliente)}},
  })
  async ObtenerClienteConUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CredencialesVerificarEstadoCliente, {
          }),
        },
      },
    })
    datos: CredencialesVerificarEstadoCliente,
  ): Promise<Object> {
    let cliente = await this.clientePlanService.obtenerClienteConIdUsuario(datos.idUsuario);
    if (cliente == null) {
      return new HttpErrors[404]("No se encontró el cliente con el usuario proporcionado")
    }
    else {
      return cliente
    }
  }

  @post('/obtener-cliente-con-correo')
  @response(200, {
    description: 'Obtener cliente con correo',
    content: {'application/json': {schema: getModelSchemaRef(CredencialesObtenerClienteConCorreo)}},
  })
  async ObtenerClienteConCorreo(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CredencialesObtenerClienteConCorreo, {
          }),
        },
      },
    })
    datos: CredencialesObtenerClienteConCorreo,
  ): Promise<Object> {
    let cliente = await this.clientePlanService.obtenerClienteConCorreo(datos.correo);
    if (cliente == null) {
      return new HttpErrors[404]("No se encontró el cliente con el usuario proporcionado")
    }
    else {
      return cliente
    }
  }
}
