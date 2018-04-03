import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ManufacturingOrderComponent } from './manufacturing-order.component';
import { ManufacturingOrderDetailComponent } from './manufacturing-order-detail.component';
import { ManufacturingOrderPopupComponent } from './manufacturing-order-dialog.component';
import { ManufacturingOrderFullPopupComponent } from './manufacturing-order-full-dialog.component';
import { ManufacturingOrderDeletePopupComponent } from './manufacturing-order-delete-dialog.component';
import { ManufacturingOrderSendPopupComponent } from './manufacturing-order-send-dialog.component';

@Injectable()
export class ManufacturingOrderResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const manufacturingOrderRoute: Routes = [
    {
        path: 'manufacturing-order',
        component: ManufacturingOrderComponent,
        resolve: {
            'pagingParams': ManufacturingOrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'manufacturing-order/:id',
        component: ManufacturingOrderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.manufacturingOrder.home.title'
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
            pageTitle: 'mmsApp.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufacturing-order/:id/edit',
        component: ManufacturingOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufacturing-order/:id/delete',
        component: ManufacturingOrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufacturing-order/:id/send',
        component: ManufacturingOrderSendPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.manufacturingOrder.home.title'
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
            pageTitle: 'mmsApp.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufacturing-order-full/:id/edit',
        component: ManufacturingOrderFullPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.manufacturingOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
