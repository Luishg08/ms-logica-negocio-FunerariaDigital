const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
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
import {ConfiguracionNotificaciones} from '../config/configuracion.notificaciones';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {CredencialesVerificarEstadoCliente, ServicioFunerario} from '../models';
import {BeneficiarioRepository, ClienteRepository, SalaRepository, ServicioFunerarioRepository} from '../repositories';
import {ClientePlanService} from '../services';
import {NotificacionesService} from '../services/notificaciones.service';
import {ServicioFunerarioService} from '../services/servicio-funerario.service';

export class ServicioFunerarioController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(BeneficiarioRepository)
    public beneficiarioRepository: BeneficiarioRepository,
    @repository(SalaRepository)
    public salaRepository: SalaRepository,
    @service(ServicioFunerarioService)
    public servicioFunerarioService: ServicioFunerarioService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(ClientePlanService)
    public servicioClientePlan: ClientePlanService
  ) { }


  @post('/solicitar-servicio')
  @response(200, {
    description: "Proceso de solicitud de un servicio por parte de un cliente",
    content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}}
  })
  async solicitarUnServicioFunerario(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicioFunerario)
          }
        }
      }
    )
    datos: Omit<ServicioFunerario, "id_servicio_funerario">
  ): Promise<Object> {
    mongoose.connect('mongodb+srv://adminChat:admin12345@serviciochat.wmgtprq.mongodb.net/?w=majority')
      .then(() => console.log('Conexión a MongoDB exitosa'))
      .catch((e: string) => console.error('Error de conexión a MongoDB:', e));

    const salaChatSchema = new mongoose.Schema({
      codigoSalaChat: String,
      idCliente: Number,
      estadoSalaChat: Boolean
    });

    const salaChat = mongoose.model('SalaChat', salaChatSchema);

    //Obtener el beneficiario junto con su cliente y su estado
    let beneficiario: any = await this.servicioFunerarioService.ObtenerClienteyEstadodelBeneficiario(datos.beneficiarioId);
    if (beneficiario) {
      if (beneficiario.clienteBeneficiario.estado_cliente === true) {
        if (beneficiario.estadoDeBeneficiario.nombre === "activo") {
          let posibleServicioConElMismoHorarioYSala: ServicioFunerario = await this.servicioFunerarioService.ConsultarServicioConMismoHorarioYSala(datos.salaId, datos.fecha_hora_ingreso, datos.fecha_hora_salida);
          if (!posibleServicioConElMismoHorarioYSala) {
            console.log("No hay un servicio con el mismo horario y sala");
            let sala: any = await this.servicioFunerarioService.ObtenerSalaConSedeYCiudad(datos.salaId);
            if (sala) {
              if (sala.sede.ciudad.nombre !== datos.ubicacion_cuerpo) {
                datos.servicio_traslado = true;
              }
              let codigo_unico = this.servicioFunerarioService.crearTextoAleatorio(8);

              const salaChat1 = new salaChat({
                codigoSalaChat: codigo_unico,
                idCliente: beneficiario.clienteBeneficiario.id_cliente,
                estadoSalaChat: true
              });
              await salaChat1.save();
              console.log('salaChat guardada exitosamente en la base de datos');

              let url1 = ConfiguracionNotificaciones.urlNotificacionCodigoServicioFunerario;
              let datosCorreo1 = {
                correoDestino: beneficiario.clienteBeneficiario.correo,
                nombreDestino: beneficiario.clienteBeneficiario.primerNombre + " " + beneficiario.clienteBeneficiario.primerApellido,
                asuntoCorreo: ConfiguracionNotificaciones.asuntoCodigoServicioFunerario,
                codigoUnico: codigo_unico,
                usuario: beneficiario.clienteBeneficiario.nombre + " " + beneficiario.clienteBeneficiario.apellido,
              };
              this.servicioNotificaciones.EnviarNotificacion(datosCorreo1, url1);

              let url = ConfiguracionNotificaciones.urlNotificacionServicioFunerario;

              // Envío de código único del servicio generado al correo electrónico del cliente
              let datosCorreo = {
                correoDestino: beneficiario.clienteBeneficiario.correo,
                nombreDestino: beneficiario.clienteBeneficiario.primerNombre + " " + beneficiario.clienteBeneficiario.primerApellido,
                asuntoCorreo: ConfiguracionNotificaciones.asuntoServicioFunerario,
                sala: sala.numero_sala,
                fechaIngreso: datos.fecha_hora_ingreso,
                fechaSalida: datos.fecha_hora_salida,
                sede: sala.sede.nombre,
                nombreUsuario: beneficiario.clienteBeneficiario.nombre + " " + beneficiario.clienteBeneficiario.apellido,
                ciudad: sala.sede.ciudad.nombre,
                ubicacionCuerpo: datos.ubicacion_cuerpo,
                beneficiario: beneficiario.nombre + " " + beneficiario.apellido,
                tipoSepultura: datos.tipo_sepultura
              };
              this.servicioNotificaciones.EnviarNotificacion(datosCorreo, url);

              let servicioFunerario: ServicioFunerario = new ServicioFunerario;
              servicioFunerario.beneficiarioId = datos.beneficiarioId;
              servicioFunerario.codigo_unico = codigo_unico;
              servicioFunerario.estado_codigo_unico = true;
              servicioFunerario.notificado = true;
              servicioFunerario.fecha_hora_ingreso = datos.fecha_hora_ingreso;
              servicioFunerario.fecha_hora_salida = datos.fecha_hora_salida;
              servicioFunerario.servicio_traslado = datos.servicio_traslado;
              servicioFunerario.tipo_sepultura = datos.tipo_sepultura;
              servicioFunerario.salaId = datos.salaId;
              servicioFunerario.ubicacion_cuerpo = datos.ubicacion_cuerpo;
              return this.servicioFunerarioRepository.create(servicioFunerario);
              ;

            } else {
              return new HttpErrors[401]("La sala no existe");
            }
          } else {
            return new HttpErrors[401]("La fecha y hora seleccionada no está disponible para la sala seleccionada, ingrese otro horario o seleccione otra sala");
          }
        } else {
          return new HttpErrors[401]("El beneficiario no se encuentra activo");
        }
      } else {
        return new HttpErrors[401]("El Cliente no ha adquirido un plan");
      }
    } else {
      return new HttpErrors[401]("El beneficiario no existe");
    }

  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.guardarAccion]
  })
  @post('/servicio-funerario')
  @response(200, {
    description: 'ServicioFunerario model instance',
    content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {
            title: 'NewServicioFunerario',
            exclude: ['id_servicio_funerario'],
          }),
        },
      },
    })
    servicioFunerario: Omit<ServicioFunerario, 'id_servicio_funerario'>,
  ): Promise<ServicioFunerario> {
    return this.servicioFunerarioRepository.create(servicioFunerario);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/servicio-funerario/count')
  @response(200, {
    description: 'ServicioFunerario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ServicioFunerario) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.listarAccion]
  })
  
  @get('/servicio-funerario-resenas')
  @response(200, {
    description: 'Se muestran todos los servicios funerarios y las reseñas de un cliente',
    content: {'application/json': {schema: getModelSchemaRef(CredencialesVerificarEstadoCliente)}},
  })
  async reseñas(
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
    let cliente = await this.servicioClientePlan.obtenerClienteConIdUsuario(datos.idUsuario);
    if (cliente) {
      let serviciosFunerarios = await this.servicioFunerarioService.ObtenerReseñasConServiciosFunerarios(cliente.id_cliente);
      if (serviciosFunerarios) {
        return serviciosFunerarios;
      }
      else {
        return []
      }
    }
    else {
      return new HttpErrors[401]("El usuario no tiene un cliente asociado ")
    }
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/servicio-funerario')
  @response(200, {
    description: 'Array of ServicioFunerario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ServicioFunerario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ServicioFunerario) filter?: Filter<ServicioFunerario>,
  ): Promise<ServicioFunerario[]> {
    return this.servicioFunerarioRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/servicio-funerario')
  @response(200, {
    description: 'ServicioFunerario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {partial: true}),
        },
      },
    })
    servicioFunerario: ServicioFunerario,
    @param.where(ServicioFunerario) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.updateAll(servicioFunerario, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/servicio-funerario/{id}')
  @response(200, {
    description: 'ServicioFunerario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ServicioFunerario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ServicioFunerario, {exclude: 'where'}) filter?: FilterExcludingWhere<ServicioFunerario>
  ): Promise<ServicioFunerario> {
    return this.servicioFunerarioRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/servicio-funerario/{id}')
  @response(204, {
    description: 'ServicioFunerario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {partial: true}),
        },
      },
    })
    servicioFunerario: ServicioFunerario,
  ): Promise<void> {
    await this.servicioFunerarioRepository.updateById(id, servicioFunerario);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.guardarAccion]
  })
  @put('/servicio-funerario/{id}')
  @response(204, {
    description: 'ServicioFunerario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servicioFunerario: ServicioFunerario,
  ): Promise<void> {
    await this.servicioFunerarioRepository.replaceById(id, servicioFunerario);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.servicioFunerarioId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/servicio-funerario/{id}')
  @response(204, {
    description: 'ServicioFunerario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servicioFunerarioRepository.deleteById(id);
  }

}
