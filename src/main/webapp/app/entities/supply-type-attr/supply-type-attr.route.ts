import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SupplyTypeAttrComponent } from './supply-type-attr.component';
import { SupplyTypeAttrDetailComponent } from './supply-type-attr-detail.component';
import { SupplyTypeAttrPopupComponent } from './supply-type-attr-dialog.component';
import { SupplyTypeAttrDeletePopupComponent } from './supply-type-attr-delete-dialog.component';

export const supplyTypeAttrRoute: Routes = [
    {
        path: 'supply-type-attr',
        component: SupplyTypeAttrComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.supplyTypeAttr.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supply-type-attr/:id',
        component: SupplyTypeAttrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.supplyTypeAttr.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplyTypeAttrPopupRoute: Routes = [
    {
        path: 'supply-type-attr-new',
        component: SupplyTypeAttrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.supplyTypeAttr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-type-attr/:id/edit',
        component: SupplyTypeAttrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.supplyTypeAttr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply-type-attr/:id/delete',
        component: SupplyTypeAttrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.supplyTypeAttr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
