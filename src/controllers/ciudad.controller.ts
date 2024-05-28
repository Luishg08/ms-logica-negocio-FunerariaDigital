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
import {Ciudad, CredencialesObtenerCiudadesDepartamento} from '../models';
import {CiudadRepository} from '../repositories';
import {CiudadService} from '../services';

export class CiudadController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository: CiudadRepository,
    @service(CiudadService)
    public ciudadService: CiudadService
  ) { }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCiudadId, ConfiguracionSeguridad.guardarAccion]

  })

  @post('/ciudad')
  @response(200, {
    description: 'Ciudad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudad',
            exclude: ['idCiudad'],
          }),
        },
      },
    })
    ciudad: Omit<Ciudad, 'idCiudad'>,
  ): Promise<Ciudad> {
    return this.ciudadRepository.create(ciudad);
  }

  @post('/ciudades-de-un-departamento')
  @response(200, {
    description: 'Ciudad model instance',
    content: {'application/json': {schema: getModelSchemaRef(CredencialesObtenerCiudadesDepartamento)}},
  })
  async obtenerCiudadesDeUnDepartamento(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CredencialesObtenerCiudadesDepartamento, {
          }),
        },
      },
    })
    datos: CredencialesObtenerCiudadesDepartamento,
  ): Promise<Object> {
    let ciudades = await this.ciudadService.ObtenerCiudadesDeUnDepartamento(datos.idDepartamento)
    if (ciudades == null) {
      return new HttpErrors[404]("No se encontraron ciudades para el departamento seleccionado")
    }
    else {
      return ciudades
    }
  }


  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCiudadId, ConfiguracionSeguridad.listarAccion]

  })

  @get('/ciudad/count')
  @response(200, {
    description: 'Ciudad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCiudadId, ConfiguracionSeguridad.listarAccion]

  })
  @get('/ciudad')
  @response(200, {
    description: 'Array of Ciudad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ciudad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ciudad) filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.ciudadRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCiudadId, ConfiguracionSeguridad.editarAccion]

  })

  @patch('/ciudad')
  @response(200, {
    description: 'Ciudad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.updateAll(ciudad, where);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCiudadId, ConfiguracionSeguridad.listarAccion]

  })




  @get('/ciudad/{id}')
  @response(200, {
    description: 'Ciudad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ciudad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ciudad, {exclude: 'where'}) filter?: FilterExcludingWhere<Ciudad>
  ): Promise<Ciudad> {
    return this.ciudadRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCiudadId, ConfiguracionSeguridad.editarAccion]

  })

  @patch('/ciudad/{id}')
  @response(204, {
    description: 'Ciudad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.updateById(id, ciudad);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCiudadId, ConfiguracionSeguridad.guardarAccion]

  })

  @put('/ciudad/{id}')
  @response(204, {
    description: 'Ciudad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.replaceById(id, ciudad);
  }

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menuCiudadId, ConfiguracionSeguridad.eliminarAccion]

  })

  @del('/ciudad/{id}')
  @response(204, {
    description: 'Ciudad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ciudadRepository.deleteById(id);
  }
}
