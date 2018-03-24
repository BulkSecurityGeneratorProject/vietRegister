import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VietRegisterSharedModule } from '../../shared';
import {
    SalleMySuffixService,
    SalleMySuffixPopupService,
    SalleMySuffixComponent,
    SalleMySuffixDetailComponent,
    SalleMySuffixDialogComponent,
    SalleMySuffixPopupComponent,
    SalleMySuffixDeletePopupComponent,
    SalleMySuffixDeleteDialogComponent,
    salleRoute,
    sallePopupRoute,
} from './';

const ENTITY_STATES = [
    ...salleRoute,
    ...sallePopupRoute,
];

@NgModule({
    imports: [
        VietRegisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SalleMySuffixComponent,
        SalleMySuffixDetailComponent,
        SalleMySuffixDialogComponent,
        SalleMySuffixDeleteDialogComponent,
        SalleMySuffixPopupComponent,
        SalleMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SalleMySuffixComponent,
        SalleMySuffixDialogComponent,
        SalleMySuffixPopupComponent,
        SalleMySuffixDeleteDialogComponent,
        SalleMySuffixDeletePopupComponent,
    ],
    providers: [
        SalleMySuffixService,
        SalleMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VietRegisterSalleMySuffixModule {}
