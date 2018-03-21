import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TracerComponent } from './tracer.component';
import { TracerWorkStationComponent } from './tracer-workstation.component';
import { TracerDetailComponent } from './tracer-detail.component';
import { TracerStartComponent } from './tracer-start.component';
import { TracerStartPopupComponent } from './tracer-start.component';
import { TracerPopupComponent } from './tracer-dialog.component';
import { TracerDeletePopupComponent } from './tracer-delete-dialog.component';

export const tracerRoute: Routes = [
    {
        path: 'tracer',
        component: TracerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.tracer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tracer/:id',
        component: TracerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.tracer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tracer/workStationIP/:ip',
        component: TracerWorkStationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.tracer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tracerPopupRoute: Routes = [
    {
        path: 'tracer-new',
        component: TracerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.tracer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tracer/:id/edit',
        component: TracerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi3App.tracer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tracer/:id/delete',
        component: TracerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi23pp.tracer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tracer/start/:id',
        component: TracerStartPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfiApp.tracer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
