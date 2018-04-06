import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupplyTypeAttrValueComponent } from './supply-type-attr-value.component';
import { SupplyTypeAttrValueDetailComponent } from './supply-type-attr-value-detail.component';
import { SupplyTypeAttrValuePopupComponent } from './supply-type-attr-value-dialog.component';
import { SupplyTypeAttrValueDeletePopupComponent } from './supply-type-attr-value-delete-dialog.component';

export const supplyTypeAttrValueRoute: Routes = [
    {
        path: 'supply-type-attr-value',
        component: SupplyTypeAttrValueComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supplyTypeAttrValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supply-type-attr-value/:id',
        component: SupplyTypeAttrValueDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supplyTypeAttrValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplyTypeAttrValuePopupRoute: Routes = [
    {
        path: 'supply-type-attr-value-new',
        component: SupplyTypeAttrValuePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supplyTypeAttrValue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-type-attr-value/:id/edit',
        component: SupplyTypeAttrValuePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supplyTypeAttrValue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-type-attr-value/:id/delete',
        component: SupplyTypeAttrValueDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supplyTypeAttrValue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
