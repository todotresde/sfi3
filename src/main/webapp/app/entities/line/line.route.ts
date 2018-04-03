import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LineComponent } from './line.component';
import { LineStatusComponent } from './line-status.component';
import { LineDetailComponent } from './line-detail.component';
import { LinePopupComponent } from './line-dialog.component';
import { LineDeletePopupComponent } from './line-delete-dialog.component';

export const lineRoute: Routes = [
    {
        path: 'line',
        component: LineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.line.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'line/:id',
        component: LineDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.line.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'line-status',
        component: LineStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.line.status.title'
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
            pageTitle: 'mmsApp.line.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'line/:id/edit',
        component: LinePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.line.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'line/:id/delete',
        component: LineDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'mmsApp.line.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
