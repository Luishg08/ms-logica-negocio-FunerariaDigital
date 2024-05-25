import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plan,
  CategoriaPlan,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanCategoriaPlanController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/categoria-plan', {
    responses: {
      '200': {
        description: 'CategoriaPlan belonging to Plan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CategoriaPlan),
          },
        },
      },
    },
  })
  async getCategoriaPlan(
    @param.path.number('id') id: typeof Plan.prototype.id,
  ): Promise<CategoriaPlan> {
    return this.planRepository.categoriaPlan(id);
  }
}
