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
  Cliente,
  Beneficiario,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteBeneficiarioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Beneficiario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Beneficiario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Beneficiario>,
  ): Promise<Beneficiario[]> {
    return this.clienteRepository.beneficiarios(id).find(filter);
  }

  @post('/clientes/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Beneficiario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id_cliente,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {
            title: 'NewBeneficiarioInCliente',
            exclude: ['id_beneficiario'],
            optional: ['clienteId']
          }),
        },
      },
    }) beneficiario: Omit<Beneficiario, 'id_beneficiario'>,
  ): Promise<Beneficiario> {
    return this.clienteRepository.beneficiarios(id).create(beneficiario);
  }

  @patch('/clientes/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Cliente.Beneficiario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {partial: true}),
        },
      },
    })
    beneficiario: Partial<Beneficiario>,
    @param.query.object('where', getWhereSchemaFor(Beneficiario)) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.clienteRepository.beneficiarios(id).patch(beneficiario, where);
  }

  @del('/clientes/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Cliente.Beneficiario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Beneficiario)) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.clienteRepository.beneficiarios(id).delete(where);
  }
}
