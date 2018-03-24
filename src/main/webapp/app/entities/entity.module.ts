import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VietRegisterVilleMySuffixModule } from './ville-my-suffix/ville-my-suffix.module';
import { VietRegisterSalleMySuffixModule } from './salle-my-suffix/salle-my-suffix.module';
import { VietRegisterPratiquantMySuffixModule } from './pratiquant-my-suffix/pratiquant-my-suffix.module';
import { VietRegisterRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { VietRegisterCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { VietRegisterLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { VietRegisterDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { VietRegisterTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { VietRegisterEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { VietRegisterJobMySuffixModule } from './job-my-suffix/job-my-suffix.module';
import { VietRegisterJobHistoryMySuffixModule } from './job-history-my-suffix/job-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        VietRegisterVilleMySuffixModule,
        VietRegisterSalleMySuffixModule,
        VietRegisterPratiquantMySuffixModule,
        VietRegisterRegionMySuffixModule,
        VietRegisterCountryMySuffixModule,
        VietRegisterLocationMySuffixModule,
        VietRegisterDepartmentMySuffixModule,
        VietRegisterTaskMySuffixModule,
        VietRegisterEmployeeMySuffixModule,
        VietRegisterJobMySuffixModule,
        VietRegisterJobHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VietRegisterEntityModule {}
