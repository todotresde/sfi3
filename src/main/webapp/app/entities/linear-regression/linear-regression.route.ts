import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LinearRegressionComponent } from './linear-regression.component';
import { LinearRegressionDetailComponent } from './linear-regression-detail.component';
import { LinearRegressionPopupComponent } from './linear-regression-dialog.component';
import { LinearRegressionDeletePopupComponent } from './linear-regression-delete-dialog.component';

@Injectable()
export class LinearRegressionResolvePagingParams implements Resolve<any> {

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

export const linearRegressionRoute: Routes = [
    {
        path: 'linear-regression',
        component: LinearRegressionComponent,
        resolve: {
            'pagingParams': LinearRegressionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.linearRegression.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'linear-regression/:id',
        component: LinearRegressionDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.linearRegression.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const linearRegressionPopupRoute: Routes = [
    {
        path: 'linear-regression-new',
        component: LinearRegressionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.linearRegression.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linear-regression/:id/edit',
        component: LinearRegressionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.linearRegression.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linear-regression/:id/delete',
        component: LinearRegressionDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.linearRegression.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
