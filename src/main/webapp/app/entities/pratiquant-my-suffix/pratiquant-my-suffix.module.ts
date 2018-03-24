import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VietRegisterSharedModule } from '../../shared';
import {
    PratiquantMySuffixService,
    PratiquantMySuffixPopupService,
    PratiquantMySuffixComponent,
    PratiquantMySuffixDetailComponent,
    PratiquantMySuffixDialogComponent,
    PratiquantMySuffixPopupComponent,
    PratiquantMySuffixDeletePopupComponent,
    PratiquantMySuffixDeleteDialogComponent,
    pratiquantRoute,
    pratiquantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pratiquantRoute,
    ...pratiquantPopupRoute,
];

@NgModule({
    imports: [
        VietRegisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PratiquantMySuffixComponent,
        PratiquantMySuffixDetailComponent,
        PratiquantMySuffixDialogComponent,
        PratiquantMySuffixDeleteDialogComponent,
        PratiquantMySuffixPopupComponent,
        PratiquantMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PratiquantMySuffixComponent,
        PratiquantMySuffixDialogComponent,
        PratiquantMySuffixPopupComponent,
        PratiquantMySuffixDeleteDialogComponent,
        PratiquantMySuffixDeletePopupComponent,
    ],
    providers: [
        PratiquantMySuffixService,
        PratiquantMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VietRegisterPratiquantMySuffixModule {}
