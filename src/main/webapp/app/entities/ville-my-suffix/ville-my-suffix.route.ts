import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VilleMySuffixComponent } from './ville-my-suffix.component';
import { VilleMySuffixDetailComponent } from './ville-my-suffix-detail.component';
import { VilleMySuffixPopupComponent } from './ville-my-suffix-dialog.component';
import { VilleMySuffixDeletePopupComponent } from './ville-my-suffix-delete-dialog.component';

export const villeRoute: Routes = [
    {
        path: 'ville-my-suffix',
        component: VilleMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Villes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ville-my-suffix/:id',
        component: VilleMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Villes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const villePopupRoute: Routes = [
    {
        path: 'ville-my-suffix-new',
        component: VilleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Villes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ville-my-suffix/:id/edit',
        component: VilleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Villes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ville-my-suffix/:id/delete',
        component: VilleMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Villes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
