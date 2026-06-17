// Imports
import { architecture } from './architecture';
import { businessAnalytic } from './business_analytic';
import { developerSolve } from './developer_solve';
import { directorCompany } from './director_company';
import type { ActorContext, ArchitecturePlan, DeveloperTask } from './director_company';

// Named exports
export {
  architecture,
  businessAnalytic,
  developerSolve,
  directorCompany
};
export type {
  ActorContext,
  ArchitecturePlan,
  DeveloperTask
};

// Default export
const actors = {
  architecture,
  businessAnalytic,
  developerSolve,
  directorCompany,
};


export default actors;
