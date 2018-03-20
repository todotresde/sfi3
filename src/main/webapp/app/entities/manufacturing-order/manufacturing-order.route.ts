import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ManufacturingOrderComponent } from './manufacturing-order.component';
import { ManufacturingOrderDetailComponent } from './manufacturing-order-detail.component';
import { ManufacturingOrderPopupComponent } from './manufacturing-order-dialog.component';
import { ManufacturingOrderFullPopupComponent } from './manufacturing-order-full-dialog.component';
import { ManufacturingOrderDeletePopupComponent } from './manufacturing-order-delete-dialog.component';
import { ManufacturingOrderSendPopupComponent } from './manufacturing-order-send-dialog.component';

export const manufacturingOrderRoute: Routes = [
    {
        path: 'manufacturing-order',
        component: ManufacturingOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'manufacturing-order/:id',
        component: ManufacturingOrderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const manufacturingOrderPopupRoute: Routes = [
    {
        path: 'manufacturing-order-new',
        component: ManufacturingOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufacturing-order/:id/edit',
        component: ManufacturingOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufacturing-order/:id/delete',
        component: ManufacturingOrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufacturing-order/:id/send',
        component: ManufacturingOrderSendPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
export const manufacturingOrderFullPopupRoute: Routes = [
    {
        path: 'manufacturing-order-full-new',
        component: ManufacturingOrderFullPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufacturing-order-full/:id/edit',
        component: ManufacturingOrderFullPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
