import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WorkStationConfigComponent } from './work-station-config.component';
import { WorkStationConfigDetailComponent } from './work-station-config-detail.component';
import { WorkStationConfigPopupComponent } from './work-station-config-dialog.component';
import { WorkStationConfigDeletePopupComponent } from './work-station-config-delete-dialog.component';

export const workStationConfigRoute: Routes = [
    {
        path: 'work-station-config',
        component: WorkStationConfigComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStationConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'work-station-config/:id',
        component: WorkStationConfigDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStationConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workStationConfigPopupRoute: Routes = [
    {
        path: 'work-station-config-new',
        component: WorkStationConfigPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStationConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-station-config/:id/edit',
        component: WorkStationConfigPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStationConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-station-config/:id/delete',
        component: WorkStationConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStationConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
