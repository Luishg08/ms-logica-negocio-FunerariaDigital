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
import {CredencialesVerificarEstadoCliente, MetodoPagoCliente} from '../models';
import {MetodoPagoClienteRepository} from '../repositories';
import {ClientePlanService} from '../services';

export class MetodoDePagoClienteController {
  constructor(
    @repository(MetodoPagoClienteRepository)
    public metodoPagoClienteRepository: MetodoPagoClienteRepository,
    @service(ClientePlanService)
    public clientePlanService: ClientePlanService
  ) { }

  @post('/metodo-pago-cliente')
  @response(200, {
    description: 'MetodoPagoCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(MetodoPagoCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPagoCliente, {
            title: 'NewMetodoPagoCliente',
            exclude: ['idMetodoPagoCliente'],
          }),
        },
      },
    })
    metodoPagoCliente: Omit<MetodoPagoCliente, 'id'>,
  ): Promise<MetodoPagoCliente> {
    return this.metodoPagoClienteRepository.create(metodoPagoCliente);
  }

  @get('/metodo-pago-cliente/count')
  @response(200, {
    description: 'MetodoPagoCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MetodoPagoCliente) where?: Where<MetodoPagoCliente>,
  ): Promise<Count> {
    return this.metodoPagoClienteRepository.count(where);
  }

  @get('/metodo-pago-cliente')
  @response(200, {
    description: 'Array of MetodoPagoCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MetodoPagoCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MetodoPagoCliente) filter?: Filter<MetodoPagoCliente>,
  ): Promise<MetodoPagoCliente[]> {
    return this.metodoPagoClienteRepository.find(filter);
  }

  @patch('/metodo-pago-cliente')
  @response(200, {
    description: 'MetodoPagoCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPagoCliente, {partial: true}),
        },
      },
    })
    metodoPagoCliente: MetodoPagoCliente,
    @param.where(MetodoPagoCliente) where?: Where<MetodoPagoCliente>,
  ): Promise<Count> {
    return this.metodoPagoClienteRepository.updateAll(metodoPagoCliente, where);
  }

  @get('/metodo-pago-cliente/{id}')
  @response(200, {
    description: 'MetodoPagoCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MetodoPagoCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MetodoPagoCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<MetodoPagoCliente>
  ): Promise<MetodoPagoCliente> {
    return this.metodoPagoClienteRepository.findById(id, filter);
  }

  @patch('/metodo-pago-cliente/{id}')
  @response(204, {
    description: 'MetodoPagoCliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MetodoPagoCliente, {partial: true}),
        },
      },
    })
    metodoPagoCliente: MetodoPagoCliente,
  ): Promise<void> {
    await this.metodoPagoClienteRepository.updateById(id, metodoPagoCliente);
  }

  @put('/metodo-pago-cliente/{id}')
  @response(204, {
    description: 'MetodoPagoCliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() metodoPagoCliente: MetodoPagoCliente,
  ): Promise<void> {
    await this.metodoPagoClienteRepository.replaceById(id, metodoPagoCliente);
  }

  @del('/metodo-pago-cliente/{id}')
  @response(204, {
    description: 'MetodoPagoCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.metodoPagoClienteRepository.deleteById(id);
  }

  @post('/metodos-de-pago-de-un-cliente')
  @response(200, {
    description: 'Se muestran todos los servicios funerarios y las reseñas de un cliente',
    content: {'application/json': {schema: getModelSchemaRef(CredencialesVerificarEstadoCliente)}},
  })
  async metodosDePagoDeUnCliente(
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
    let cliente = await this.clientePlanService.obtenerClienteConIdUsuario(datos.idUsuario);
    if (cliente) {
      let metodosPago: any[] = await this.metodoPagoClienteRepository.find({
        where: {
          clienteId: cliente.id_cliente
        },
        include: [
          {
            relation: "miCliente"
          },
          {
            relation: "metodoPago"
          }
        ]
      })
      return metodosPago;
    }
    else {
      return new HttpErrors[401]("El usuario no tiene un cliente asociado");
    }
  }
}
