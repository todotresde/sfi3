import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SupplyComponent } from './supply.component';
import { SupplyDetailComponent } from './supply-detail.component';
import { SupplyPopupComponent } from './supply-dialog.component';
import { SupplyDeletePopupComponent } from './supply-delete-dialog.component';

@Injectable()
export class SupplyResolvePagingParams implements Resolve<any> {

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

export const supplyRoute: Routes = [
    {
        path: 'supply',
        component: SupplyComponent,
        resolve: {
            'pagingParams': SupplyResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supply.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'supply/:id',
        component: SupplyDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supply.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supplyPopupRoute: Routes = [
    {
        path: 'supply-new',
        component: SupplyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supply.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply/:id/edit',
        component: SupplyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supply.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'supply/:id/delete',
        component: SupplyDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.supply.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
