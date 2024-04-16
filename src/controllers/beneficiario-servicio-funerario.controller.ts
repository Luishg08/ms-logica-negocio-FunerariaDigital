import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Beneficiario,
  ServicioFunerario,
} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioServicioFunerarioController {
  constructor(
    @repository(BeneficiarioRepository) protected beneficiarioRepository: BeneficiarioRepository,
  ) { }

  @get('/beneficiarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of Beneficiario has many ServicioFunerario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ServicioFunerario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ServicioFunerario>,
  ): Promise<ServicioFunerario[]> {
    return this.beneficiarioRepository.servicioFunerarios(id).find(filter);
  }

  @post('/beneficiarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Beneficiario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Beneficiario.prototype.id_beneficiario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {
            title: 'NewServicioFunerarioInBeneficiario',
            exclude: ['id_servicio_funerario'],
            optional: ['beneficiarioId']
          }),
        },
      },
    }) servicioFunerario: Omit<ServicioFunerario, 'id_servicio_funerario'>,
  ): Promise<ServicioFunerario> {
    return this.beneficiarioRepository.servicioFunerarios(id).create(servicioFunerario);
  }

  @patch('/beneficiarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Beneficiario.ServicioFunerario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {partial: true}),
        },
      },
    })
    servicioFunerario: Partial<ServicioFunerario>,
    @param.query.object('where', getWhereSchemaFor(ServicioFunerario)) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.servicioFunerarios(id).patch(servicioFunerario, where);
  }

  @del('/beneficiarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Beneficiario.ServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ServicioFunerario)) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.servicioFunerarios(id).delete(where);
  }
}
