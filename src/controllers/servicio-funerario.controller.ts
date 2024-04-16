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
import {ServicioFunerario} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository : ServicioFunerarioRepository,
  ) {}

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
