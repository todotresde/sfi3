import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeeComponent } from './employee.component';
import { EmployeeTimeComponent } from './employee-time.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeePopupComponent } from './employee-dialog.component';
import { EmployeeDeletePopupComponent } from './employee-delete-dialog.component';

export const employeeRoute: Routes = [
    {
        path: 'employee',
        component: EmployeeComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employee/:id',
        component: EmployeeDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employee/time/:id',
        component: EmployeeTimeComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeePopupRoute: Routes = [
    {
        path: 'employee-new',
        component: EmployeePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee/:id/edit',
        component: EmployeePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee/:id/delete',
        component: EmployeeDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'mmsApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
