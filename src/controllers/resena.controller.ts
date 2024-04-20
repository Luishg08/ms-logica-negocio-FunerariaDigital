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
import {CredencialesResenarServicio, Resena} from '../models';
import {ResenaRepository} from '../repositories';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {authenticate} from '@loopback/authentication';

export class ResenaController {
  constructor(
    @repository(ResenaRepository)
    public resenaRepository : ResenaRepository,
  ) {}

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
