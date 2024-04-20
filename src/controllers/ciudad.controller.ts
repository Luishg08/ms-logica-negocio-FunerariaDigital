import { authenticate } from '@loopback/authentication'; 
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {Ciudad} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository : CiudadRepository,
  ) {}

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
