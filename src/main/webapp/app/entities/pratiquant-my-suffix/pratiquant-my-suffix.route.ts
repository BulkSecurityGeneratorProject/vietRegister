import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PratiquantMySuffixComponent } from './pratiquant-my-suffix.component';
import { PratiquantMySuffixDetailComponent } from './pratiquant-my-suffix-detail.component';
import { PratiquantMySuffixPopupComponent } from './pratiquant-my-suffix-dialog.component';
import { PratiquantMySuffixDeletePopupComponent } from './pratiquant-my-suffix-delete-dialog.component';

export const pratiquantRoute: Routes = [
    {
        path: 'pratiquant-my-suffix',
        component: PratiquantMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pratiquants'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pratiquant-my-suffix/:id',
        component: PratiquantMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pratiquants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pratiquantPopupRoute: Routes = [
    {
        path: 'pratiquant-my-suffix-new',
        component: PratiquantMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pratiquants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pratiquant-my-suffix/:id/edit',
        component: PratiquantMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pratiquants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pratiquant-my-suffix/:id/delete',
        component: PratiquantMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pratiquants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
