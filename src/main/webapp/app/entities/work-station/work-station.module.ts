import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi3SharedModule } from '../../shared';
import {
    WorkStationService,
    WorkStationPopupService,
    WorkStationComponent,
    WorkStationDetailComponent,
    WorkStationDialogComponent,
    WorkStationPopupComponent,
    WorkStationDeletePopupComponent,
    WorkStationDeleteDialogComponent,
    workStationRoute,
    workStationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...workStationRoute,
    ...workStationPopupRoute,
];

@NgModule({
    imports: [
        Sfi3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WorkStationComponent,
        WorkStationDetailComponent,
        WorkStationDialogComponent,
        WorkStationDeleteDialogComponent,
        WorkStationPopupComponent,
        WorkStationDeletePopupComponent,
    ],
    entryComponents: [
        WorkStationComponent,
        WorkStationDialogComponent,
        WorkStationPopupComponent,
        WorkStationDeleteDialogComponent,
        WorkStationDeletePopupComponent,
    ],
    providers: [
        WorkStationService,
        WorkStationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi3WorkStationModule {}
