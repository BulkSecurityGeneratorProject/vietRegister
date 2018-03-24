import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VietRegisterSharedModule } from '../../shared';
import {
    VilleMySuffixService,
    VilleMySuffixPopupService,
    VilleMySuffixComponent,
    VilleMySuffixDetailComponent,
    VilleMySuffixDialogComponent,
    VilleMySuffixPopupComponent,
    VilleMySuffixDeletePopupComponent,
    VilleMySuffixDeleteDialogComponent,
    villeRoute,
    villePopupRoute,
} from './';

const ENTITY_STATES = [
    ...villeRoute,
    ...villePopupRoute,
];

@NgModule({
    imports: [
        VietRegisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VilleMySuffixComponent,
        VilleMySuffixDetailComponent,
        VilleMySuffixDialogComponent,
        VilleMySuffixDeleteDialogComponent,
        VilleMySuffixPopupComponent,
        VilleMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        VilleMySuffixComponent,
        VilleMySuffixDialogComponent,
        VilleMySuffixPopupComponent,
        VilleMySuffixDeleteDialogComponent,
        VilleMySuffixDeletePopupComponent,
    ],
    providers: [
        VilleMySuffixService,
        VilleMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VietRegisterVilleMySuffixModule {}
