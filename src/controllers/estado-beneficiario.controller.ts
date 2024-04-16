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
import {EstadoBeneficiario} from '../models';
import {EstadoBeneficiarioRepository} from '../repositories';

export class EstadoBeneficiarioController {
  constructor(
    @repository(EstadoBeneficiarioRepository)
    public estadoBeneficiarioRepository : EstadoBeneficiarioRepository,
  ) {}

  @post('/estado-beneficiario')
  @response(200, {
    description: 'EstadoBeneficiario model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoBeneficiario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoBeneficiario, {
            title: 'NewEstadoBeneficiario',
            exclude: ['id_estado'],
          }),
        },
      },
    })
    estadoBeneficiario: Omit<EstadoBeneficiario, 'id_estado'>,
  ): Promise<EstadoBeneficiario> {
    return this.estadoBeneficiarioRepository.create(estadoBeneficiario);
  }

  @get('/estado-beneficiario/count')
  @response(200, {
    description: 'EstadoBeneficiario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoBeneficiario) where?: Where<EstadoBeneficiario>,
  ): Promise<Count> {
    return this.estadoBeneficiarioRepository.count(where);
  }

  @get('/estado-beneficiario')
  @response(200, {
    description: 'Array of EstadoBeneficiario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoBeneficiario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoBeneficiario) filter?: Filter<EstadoBeneficiario>,
  ): Promise<EstadoBeneficiario[]> {
    return this.estadoBeneficiarioRepository.find(filter);
  }

  @patch('/estado-beneficiario')
  @response(200, {
    description: 'EstadoBeneficiario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoBeneficiario, {partial: true}),
        },
      },
    })
    estadoBeneficiario: EstadoBeneficiario,
    @param.where(EstadoBeneficiario) where?: Where<EstadoBeneficiario>,
  ): Promise<Count> {
    return this.estadoBeneficiarioRepository.updateAll(estadoBeneficiario, where);
  }

  @get('/estado-beneficiario/{id}')
  @response(200, {
    description: 'EstadoBeneficiario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoBeneficiario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoBeneficiario, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoBeneficiario>
  ): Promise<EstadoBeneficiario> {
    return this.estadoBeneficiarioRepository.findById(id, filter);
  }

  @patch('/estado-beneficiario/{id}')
  @response(204, {
    description: 'EstadoBeneficiario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoBeneficiario, {partial: true}),
        },
      },
    })
    estadoBeneficiario: EstadoBeneficiario,
  ): Promise<void> {
    await this.estadoBeneficiarioRepository.updateById(id, estadoBeneficiario);
  }

  @put('/estado-beneficiario/{id}')
  @response(204, {
    description: 'EstadoBeneficiario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoBeneficiario: EstadoBeneficiario,
  ): Promise<void> {
    await this.estadoBeneficiarioRepository.replaceById(id, estadoBeneficiario);
  }

  @del('/estado-beneficiario/{id}')
  @response(204, {
    description: 'EstadoBeneficiario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoBeneficiarioRepository.deleteById(id);
  }
}
