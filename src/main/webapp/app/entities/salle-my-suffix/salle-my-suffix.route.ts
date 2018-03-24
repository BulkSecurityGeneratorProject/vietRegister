import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SalleMySuffixComponent } from './salle-my-suffix.component';
import { SalleMySuffixDetailComponent } from './salle-my-suffix-detail.component';
import { SalleMySuffixPopupComponent } from './salle-my-suffix-dialog.component';
import { SalleMySuffixDeletePopupComponent } from './salle-my-suffix-delete-dialog.component';

export const salleRoute: Routes = [
    {
        path: 'salle-my-suffix',
        component: SalleMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'salle-my-suffix/:id',
        component: SalleMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sallePopupRoute: Routes = [
    {
        path: 'salle-my-suffix-new',
        component: SalleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salle-my-suffix/:id/edit',
        component: SalleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salle-my-suffix/:id/delete',
        component: SalleMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
