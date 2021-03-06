import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MMSSharedModule } from '../../shared';
import {
    EmployeeService,
    EmployeePopupService,
    EmployeeComponent,
    EmployeeTimeComponent,
    EmployeeDetailComponent,
    EmployeeDialogComponent,
    EmployeePopupComponent,
    EmployeeDeletePopupComponent,
    EmployeeDeleteDialogComponent,
    employeeRoute,
    employeePopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeeRoute,
    ...employeePopupRoute,
];

@NgModule({
    imports: [
        MMSSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeeComponent,
        EmployeeTimeComponent,
        EmployeeDetailComponent,
        EmployeeDialogComponent,
        EmployeeDeleteDialogComponent,
        EmployeePopupComponent,
        EmployeeDeletePopupComponent
    ],
    entryComponents: [
        EmployeeComponent,
        EmployeeTimeComponent,
        EmployeeDialogComponent,
        EmployeePopupComponent,
        EmployeeDeleteDialogComponent,
        EmployeeDeletePopupComponent
    ],
    providers: [
        EmployeeService,
        EmployeePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MMSEmployeeModule {}
