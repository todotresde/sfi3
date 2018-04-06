import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WorkStationComponent } from './work-station.component';
import { WorkStationDetailComponent } from './work-station-detail.component';
import { WorkStationPopupComponent } from './work-station-dialog.component';
import { WorkStationDeletePopupComponent } from './work-station-delete-dialog.component';

export const workStationRoute: Routes = [
    {
        path: 'work-station',
        component: WorkStationComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'work-station/:id',
        component: WorkStationDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workStationPopupRoute: Routes = [
    {
        path: 'work-station-new',
        component: WorkStationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-station/:id/edit',
        component: WorkStationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-station/:id/delete',
        component: WorkStationDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.workStation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
