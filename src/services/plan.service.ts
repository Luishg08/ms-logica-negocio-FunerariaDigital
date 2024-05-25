import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PlanRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class PlanService {
  constructor(@repository(PlanRepository)
  public repositorioPlan: PlanRepository) { }

  /*
   * Add service methods here
   */


  async ObtenerPlanConCategoria(idPlan: number) {
    try{
    let plan: any = await this.repositorioPlan.findById(idPlan, {
      include: [{
        relation: 'categoriaPlan'
      }]
    })
    return plan
  }catch(e){
    return null
  }
}
}
