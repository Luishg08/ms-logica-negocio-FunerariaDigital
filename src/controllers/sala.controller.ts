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
import {Sala} from '../models';
import {SalaRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';

export class SalaController {
  constructor(
    @repository(SalaRepository)
    public salaRepository : SalaRepository,
  ) {}

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuSalaId, ConfiguracionSeguridad.guardarAccion]
  })
  @post('/sala')
  @response(200, {
    description: 'Sala model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sala)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {
            title: 'NewSala',
            exclude: ['idSala'],
          }),
        },
      },
    })
    sala: Omit<Sala, 'idSala'>,
  ): Promise<Sala> {
    return this.salaRepository.create(sala);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuSalaId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/sala/count')
  @response(200, {
    description: 'Sala model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sala) where?: Where<Sala>,
  ): Promise<Count> {
    return this.salaRepository.count(where);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuSalaId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/sala')
  @response(200, {
    description: 'Array of Sala model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sala, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sala) filter?: Filter<Sala>,
  ): Promise<Sala[]> {
    return this.salaRepository.find(filter);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuSalaId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/sala')
  @response(200, {
    description: 'Sala PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {partial: true}),
        },
      },
    })
    sala: Sala,
    @param.where(Sala) where?: Where<Sala>,
  ): Promise<Count> {
    return this.salaRepository.updateAll(sala, where);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuSalaId, ConfiguracionSeguridad.listarAccion]
  })
  @get('/sala/{id}')
  @response(200, {
    description: 'Sala model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sala, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sala, {exclude: 'where'}) filter?: FilterExcludingWhere<Sala>
  ): Promise<Sala> {
    return this.salaRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuSalaId, ConfiguracionSeguridad.editarAccion]
  })
  @patch('/sala/{id}')
  @response(204, {
    description: 'Sala PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {partial: true}),
        },
      },
    })
    sala: Sala,
  ): Promise<void> {
    await this.salaRepository.updateById(id, sala);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuSalaId, ConfiguracionSeguridad.editarAccion]
  })
  @put('/sala/{id}')
  @response(204, {
    description: 'Sala PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sala: Sala,
  ): Promise<void> {
    await this.salaRepository.replaceById(id, sala);
  }

  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuSalaId, ConfiguracionSeguridad.eliminarAccion]
  })
  @del('/sala/{id}')
  @response(204, {
    description: 'Sala DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salaRepository.deleteById(id);
  }
}
