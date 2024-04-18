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
import {ServicioFunerario} from '../models';
import {BeneficiarioRepository, ClienteRepository, SalaRepository, ServicioFunerarioRepository} from '../repositories';
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
    public servicioNotificaciones: NotificacionesService
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
              let url = ConfiguracionNotificaciones.urlNotificacionServicioFunerario;

              // Envío de código único del servicio generado al correo electrónico del cliente
              let datosCorreo = {
                correoDestino: beneficiario.clienteBeneficiario.correo,
                nombreDestino: beneficiario.clienteBeneficiario.primerNombre + " " + beneficiario.clienteBeneficiario.primerApellido,
                contenidoCorreo: `${codigo_unico}`,
                asuntoCorreo: ConfiguracionNotificaciones.asuntoCodigoServicioFunerario,
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
              this.servicioFunerarioRepository.create(servicioFunerario);


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



    /**
     *
     * await customerRepository.find({
      include: [
        {
          relation: 'orders',
          scope: {
            include: [{relation: 'shipment'}],
          },
        },
      ],
    });

    console.log("Este es el beneficiario:", beneficiario);

    if (beneficiario) {
      if (beneficiario.estadoDeBeneficiario.nombre === "activo") {
        if (beneficiario.clienteBeneficiario.estado_cliente === true) {
          console.log("Todo ok con estados de beneficiario y cliente")
          let sala: any = await this.salaRepository.findById(datos.salaId, {
            include: [
              {
                relation: 'Sede',
                scope: {
                  include: [{relation: 'Ciudad'}],
                },
              },
            ],
          });
          console.log("Esta es la sala:", sala);
          if (sala) {
            let servicioYaCreado = await this.servicioFunerarioRepository.findOne({
              where: {
                salaId: datos.salaId,
                fecha_hora_ingreso: datos.fecha_hora_ingreso,
                fecha_hora_salida: datos.fecha_hora_salida
              }
            })
            if (servicioYaCreado) {
              return new HttpErrors[401]("La fecha y hora seleccionada no está disponible para la sala seleccionada, ingrese otro horario o seleccione otra sala");
            }
            else {
              let ciudad = sala.Sede.Ciudad.nombre;
              let traslado = true;
              console.log("Esta es la ciudad ingresada:", datos.ubicacion_cuerpo);
              console.log("Esta es la ciudad de la sede:", sala.Sede.Ciudad.nombre);

              if (ciudad === datos.ubicacion_cuerpo) {
                traslado = false;
              }
              console.log("Este es el traslado:", traslado);
              let codigo_unico = this.servicioFunerarioService.crearTextoAleatorio(5);
              console.log("Este es el código único:", codigo_unico);

              let servicioFunerario: ServicioFunerario = new ServicioFunerario;
              servicioFunerario.beneficiarioId = datos.beneficiarioId;
              servicioFunerario.codigo_unico = codigo_unico;
              servicioFunerario.estado_codigo_unico = true;
              servicioFunerario.notificado = true;
              servicioFunerario.fecha_hora_ingreso = datos.fecha_hora_ingreso;
              servicioFunerario.fecha_hora_salida = datos.fecha_hora_salida;
              servicioFunerario.servicio_traslado = traslado;
              servicioFunerario.tipo_sepultura = datos.tipo_sepultura;
              servicioFunerario.salaId = datos.salaId;
              this.servicioFunerarioRepository.create(servicioFunerario)
              console.log("Este es el servicio funerario:", servicioFunerario);


            }
          } else {
            return new HttpErrors[401]("La sala no existe");
          }
        }
        else {
          return new HttpErrors[401]("El Cliente no ha adquirido un plan");
        }
      }
      else {
        return new HttpErrors[401]("El beneficiario no se encuentra activo");
      }
    }
    else {
      return new HttpErrors[401]("El beneficiario no existe");
    }


    /*
      //Comprobar si el cliente tiene un plan o esta activo
      if (cliente.estado_cliente) {
        //Obtener el beneficiario con el idBeneficiario recibido
        //let beneficiario = this.beneficiarioRepository.findById(credenciales.idBeneficiario)
        //Comprobar si el beneficiario está activo
        let estadoBeneficiario = this.estadoBeneficiarioRepository.findById(beneficiario.estadoId)
        if (estadoBeneficiario.nombre === "activo") {
          //Obtener la sala con el idSala recibido
          let sala = this.salaRepository.findById(credenciales.idSala)
          //Verificar en registros de serviciosFunerarios si existe uno que tenga el mismo horario
          let servicioYaCreado = this.servicioFunerarioRepository.findOne({
            where: {
              salaId: credenciales.salaId,
              fecha_hora_ingreso: credenciales.fecha_hora_ingreso,
              fecha_hora_salida: credenciales.fecha_hora_salida
            }
          })
          if (servicioYaCreado) {
            return new HttpErrors[401]("La fecha y hora seleccionada no está disponible para la sala seleccionada, ingrese otro horario o seleccione otra sala");
          }
          else {
            //Obtener sede de la sala
            let sede = this.sedeRepository.findById(sala.sedeId)
            //Obtener ciudad de la sede
            let ciudad = this.ciudadRepository.findById(sede.ciudadId)
            //Comparar ciudad obtenida con la ubicación del cuerpo
            let traslado = true
            if (ciudad.nombre === credenciales.ubicacion_cuerpo) {
              //Asignar servicio de traslado true o false
              traslado = false
            }
            //Generar el código único del servicioFunerario
            let codigo_unico = this.servicioSeguridad.crearTextoAleatorio(5) //Crear la función y el servicio
            //Enviarlo por correo electrónico al cliente
            //... http/
            //si la petición devuelve un OK
            let estadoNotificado = true
            //Consumir servicio de chat

            //Generar un nuevo registro de servicioFunerario
            let servicioFunerario: ServicioFunerario = new ServicioFunerario

            servicioFunerario.beneficiarioId = credenciales.beneficiarioId
            servicioFunerario.codigo_unico = codigo_unico
            servicioFunerario.estado_codigo_unico = true
            servicioFunerario.notificado = estadoNotificado
            servicioFunerario.fecha_hora_ingreso
            servicioFunerario.fecha_hora_salida
            servicioFunerario.servicio_traslado = traslado
            servicioFunerario.tipo_sepultura = credenciales.tipo_sepultura

            return this.servicioFunerarioRepository.create(servicioFunerario)
          }
        }
        else {
          return new HttpErrors[401]("El beneficiario no se encuentra activo, agrégelo a su plan actual o adquiera uno nuevo");
        }
      }
      else {
        return new HttpErrors[401]("El cliente no se encuentra activo, debe adquirir un plan antes de proceder");
      }
      */
    return new HttpErrors[401]("Credenciales incorrectas.");
  }

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

  @del('/servicio-funerario/{id}')
  @response(204, {
    description: 'ServicioFunerario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servicioFunerarioRepository.deleteById(id);
  }

}
