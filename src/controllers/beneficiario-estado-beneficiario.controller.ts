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
  EstadoBeneficiario,
} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioEstadoBeneficiarioController {
  constructor(
    @repository(BeneficiarioRepository) protected beneficiarioRepository: BeneficiarioRepository,
  ) { }

  @get('/beneficiarios/{id}/estado-beneficiario', {
    responses: {
      '200': {
        description: 'Beneficiario has one EstadoBeneficiario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EstadoBeneficiario),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EstadoBeneficiario>,
  ): Promise<EstadoBeneficiario> {
    return this.beneficiarioRepository.estadoBeneficiario(id).get(filter);
  }

  @post('/beneficiarios/{id}/estado-beneficiario', {
    responses: {
      '200': {
        description: 'Beneficiario model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstadoBeneficiario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Beneficiario.prototype.id_beneficiario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoBeneficiario, {
            title: 'NewEstadoBeneficiarioInBeneficiario',
            exclude: ['id_estado'],
            optional: ['id_estado']
          }),
        },
      },
    }) estadoBeneficiario: Omit<EstadoBeneficiario, 'id_estado'>,
  ): Promise<EstadoBeneficiario> {
    return this.beneficiarioRepository.estadoBeneficiario(id).create(estadoBeneficiario);
  }

  @patch('/beneficiarios/{id}/estado-beneficiario', {
    responses: {
      '200': {
        description: 'Beneficiario.EstadoBeneficiario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoBeneficiario, {partial: true}),
        },
      },
    })
    estadoBeneficiario: Partial<EstadoBeneficiario>,
    @param.query.object('where', getWhereSchemaFor(EstadoBeneficiario)) where?: Where<EstadoBeneficiario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.estadoBeneficiario(id).patch(estadoBeneficiario, where);
  }

  @del('/beneficiarios/{id}/estado-beneficiario', {
    responses: {
      '200': {
        description: 'Beneficiario.EstadoBeneficiario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EstadoBeneficiario)) where?: Where<EstadoBeneficiario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.estadoBeneficiario(id).delete(where);
  }
}
