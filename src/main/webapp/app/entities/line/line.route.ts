import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LineComponent } from './line.component';
import { LineDetailComponent } from './line-detail.component';
import { LinePopupComponent } from './line-dialog.component';
import { LineDeletePopupComponent } from './line-delete-dialog.component';

export const lineRoute: Routes = [
    {
        path: 'line',
        component: LineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.line.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'line/:id',
        component: LineDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.line.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const linePopupRoute: Routes = [
    {
        path: 'line-new',
        component: LinePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.line.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'line/:id/edit',
        component: LinePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.line.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'line/:id/delete',
        component: LineDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.line.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
