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
  response
} from '@loopback/rest';
import {ConfiguracionNotificaciones} from '../config/configuracion.notificaciones';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {CredencialesResenarServicio, Resena} from '../models';
import {ResenaRepository} from '../repositories';
import {ClientePlanService, ResenaService} from '../services';
import {NotificacionesService} from '../services/notificaciones.service';

export class ResenaController {
  constructor(
    @repository(ResenaRepository)
    public resenaRepository: ResenaRepository,
    @service(ResenaService)
    public resenaService: ResenaService,
    @service(ClientePlanService)
    public clientePlanService: ClientePlanService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuResenaId, ConfiguracionSeguridad.guardarAccion]

  })

  @post('/resena')
  @response(200, {
    description: 'Resena model instance',
    content: {'application/json': {schema: getModelSchemaRef(Resena)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {
            title: 'NewResena',
            exclude: ['idResena'],
          }),
        },
      },
    })
    resena: Omit<Resena, 'id'>,
  ): Promise<Resena> {
    return this.resenaRepository.create(resena);
  }


  @post('/resenar-servicio')
  @response(200, {
    description: 'Resena model instance',
    content: {'application/json': {schema: getModelSchemaRef(CredencialesResenarServicio)}},
  })
  async reseñarServicio(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CredencialesResenarServicio),
        },
      },
    })
    resena: Omit<CredencialesResenarServicio, 'idResena'>,
  ): Promise<Object> {
    let idCliente = await this.resenaService.ObtenerClientePorIdServicioFunerario(resena.servicioFunerarioId);
    console.log(idCliente + "Este es el id del cliente");
    if (!idCliente) {
      return new HttpErrors[401]('No se encontró un cliente asociado al servicio funerario');
    }
    else {
      let cliente: any = await this.clientePlanService.obtenerClienteConIdUsuario(resena.idUsuario);
      if (!cliente) {
        return new HttpErrors[401]('No se encontró un cliente asociado al usuario');
      }
      if (cliente.id_cliente != idCliente) {
        return new HttpErrors[401]('El cliente no tiene permisos para reseñar este servicio funerario');
      }
      else {
        let puedeReseñar: boolean = await this.resenaService.VerificarSiClienteYaPuedeResenar(resena.servicioFunerarioId);
        if (!puedeReseñar) {
          return new HttpErrors[401]('El cliente no puede reseñar este servicio funerario porque no ha pasado la fecha');
        }
        else {
          let reseña = new Resena()
          reseña.fechaResena = new Date();
          reseña.calificacion = resena.calificacion;
          reseña.comentario = resena.comentario;
          reseña.servicioFunerarioId = resena.servicioFunerarioId;

          let url1 = ConfiguracionNotificaciones.urlNotificacionAgradecimientoReseña;
          let datosCorreo1 = {
            correoDestino: cliente.correo,
            nombreDestino: cliente.nombre + " " + cliente.apellido,
            asuntoCorreo: ConfiguracionNotificaciones.asuntoAgradecimientoReseña,
            idServicioFunerario: resena.servicioFunerarioId.toString(),
            usuario: cliente.nombre + " " + cliente.apellido
          };

          this.servicioNotificaciones.EnviarNotificacion(datosCorreo1, url1)
          return this.resenaRepository.create(reseña);
        }
      }
    }

  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuResenaId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/resena/count')
  @response(200, {
    description: 'Resena model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Resena) where?: Where<Resena>,
  ): Promise<Count> {
    return this.resenaRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuResenaId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/resena')
  @response(200, {
    description: 'Array of Resena model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Resena, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Resena) filter?: Filter<Resena>,
  ): Promise<Resena[]> {
    return this.resenaRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuResenaId, ConfiguracionSeguridad.editarAccion]

  })

  @patch('/resena')
  @response(200, {
    description: 'Resena PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {partial: true}),
        },
      },
    })
    resena: Resena,
    @param.where(Resena) where?: Where<Resena>,
  ): Promise<Count> {
    return this.resenaRepository.updateAll(resena, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuResenaId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/resena/{id}')
  @response(200, {
    description: 'Resena model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Resena, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Resena, {exclude: 'where'}) filter?: FilterExcludingWhere<Resena>
  ): Promise<Resena> {
    return this.resenaRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuResenaId, ConfiguracionSeguridad.editarAccion]

  })

  @patch('/resena/{id}')
  @response(204, {
    description: 'Resena PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {partial: true}),
        },
      },
    })
    resena: Resena,
  ): Promise<void> {
    await this.resenaRepository.updateById(id, resena);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuResenaId, ConfiguracionSeguridad.guardarAccion]

  })

  @put('/resena/{id}')
  @response(204, {
    description: 'Resena PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resena: Resena,
  ): Promise<void> {
    await this.resenaRepository.replaceById(id, resena);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuResenaId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/resena/{id}')
  @response(204, {
    description: 'Resena DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resenaRepository.deleteById(id);
  }
}
