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
import {Beneficiario, CredencialesCambiarEstadoBeneficiario, CredencialesVerificarEstadoCliente} from '../models';
import {BeneficiarioRepository, EstadoBeneficiarioRepository} from '../repositories';
import {ClientePlanService} from '../services';

export class BeneficiarioController {
  constructor(
    @repository(BeneficiarioRepository)
    public beneficiarioRepository: BeneficiarioRepository,
    @service(ClientePlanService)
    public clientePlanService: ClientePlanService,
    @repository(EstadoBeneficiarioRepository)
    public estadoBeneficiarioRepository: EstadoBeneficiarioRepository
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.guardarAccion]
  })
  @post('/beneficiario')
  @response(200, {
    description: 'Beneficiario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Beneficiario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {
            title: 'NewBeneficiario',
            exclude: ['id_beneficiario'],
          }),
        },
      },
    })
    beneficiario: Omit<Beneficiario, 'id_beneficiario'>,
  ): Promise<Beneficiario> {
    return this.beneficiarioRepository.create(beneficiario);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/beneficiario/count')
  @response(200, {
    description: 'Beneficiario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Beneficiario) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/beneficiario')
  @response(200, {
    description: 'Array of Beneficiario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Beneficiario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Beneficiario) filter?: Filter<Beneficiario>,
  ): Promise<Beneficiario[]> {
    return this.beneficiarioRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.editarAccion]

  })
  @patch('/beneficiario')
  @response(200, {
    description: 'Beneficiario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {partial: true}),
        },
      },
    })
    beneficiario: Beneficiario,
    @param.where(Beneficiario) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.updateAll(beneficiario, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/beneficiario/{id}')
  @response(200, {
    description: 'Beneficiario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Beneficiario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Beneficiario, {exclude: 'where'}) filter?: FilterExcludingWhere<Beneficiario>
  ): Promise<Beneficiario> {
    return this.beneficiarioRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.editarAccion]

  })
  @patch('/beneficiario/{id}')
  @response(204, {
    description: 'Beneficiario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {partial: true}),
        },
      },
    })
    beneficiario: Beneficiario,
  ): Promise<void> {
    await this.beneficiarioRepository.updateById(id, beneficiario);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.editarAccion]

  })
  @put('/beneficiario/{id}')
  @response(204, {
    description: 'Beneficiario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() beneficiario: Beneficiario,
  ): Promise<void> {
    await this.beneficiarioRepository.replaceById(id, beneficiario);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuBeneficiarioId, ConfiguracionSeguridad.eliminarAccion]

  })
  @del('/beneficiario/{id}')
  @response(204, {
    description: 'Beneficiario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.beneficiarioRepository.deleteById(id);
  }

  @post('/beneficiarios-de-cliente')
  @response(200, {
    description: 'Se muestran todos los servicios funerarios y las reseñas de un cliente',
    content: {'application/json': {schema: getModelSchemaRef(CredencialesVerificarEstadoCliente)}},
  })
  async BeneficiariosDeUnCliente(
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
      let beneficiarios: any[] = await this.beneficiarioRepository.find({
        where: {
          clienteId: cliente.id_cliente
        },
        include: [
          {
            relation: "estadoDeBeneficiario"
          },
        ]
      })
      return beneficiarios;
    }
    else {
      return new HttpErrors[401]("El usuario no tiene un cliente asociado");
    }
  }

  @patch('/actualizar-estado-beneficiario')
  @response(200, {
    description: 'Beneficiario PATCH success count',
    content: {'application/json': {schema: CredencialesCambiarEstadoBeneficiario}},
  })
  async cambiarEstadoDeUnBeneficiario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CredencialesCambiarEstadoBeneficiario),
        },
      },
    })
    datos: CredencialesCambiarEstadoBeneficiario,
  ): Promise<Object> {
    let cliente = await this.clientePlanService.obtenerClienteConIdUsuario(datos.idUsuario);
    if (cliente) {
      let beneficiario = await this.beneficiarioRepository.findById(datos.idBeneficiario);
      if (beneficiario) {
        if (beneficiario.clienteId === cliente.id_cliente) {
          let estado: any = await this.estadoBeneficiarioRepository.findOne({
            where: {
              nombre: datos.estadoNuevo
            }
          })
          console.log(estado);
          beneficiario.estadoId = estado.id_estado;
          this.beneficiarioRepository.updateById(datos.idBeneficiario, beneficiario);
          return this.beneficiarioRepository.findById(datos.idBeneficiario);
        }
        else {
          return new HttpErrors[401]("El beneficiario no pertenece al cliente");
        }
      }
      else {
        return new HttpErrors[401]("El beneficiario no existe");
      }
    }
    return new HttpErrors[401]("El usuario no tiene un cliente asociado");
  }
}
