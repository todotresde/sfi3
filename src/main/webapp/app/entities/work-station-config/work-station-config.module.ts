import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi3SharedModule } from '../../shared';
import {
    WorkStationConfigService,
    WorkStationConfigPopupService,
    WorkStationConfigComponent,
    WorkStationConfigDetailComponent,
    WorkStationConfigDialogComponent,
    WorkStationConfigPopupComponent,
    WorkStationConfigDeletePopupComponent,
    WorkStationConfigDeleteDialogComponent,
    workStationConfigRoute,
    workStationConfigPopupRoute,
} from './';

const ENTITY_STATES = [
    ...workStationConfigRoute,
    ...workStationConfigPopupRoute,
];

@NgModule({
    imports: [
        Sfi3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WorkStationConfigComponent,
        WorkStationConfigDetailComponent,
        WorkStationConfigDialogComponent,
        WorkStationConfigDeleteDialogComponent,
        WorkStationConfigPopupComponent,
        WorkStationConfigDeletePopupComponent,
    ],
    entryComponents: [
        WorkStationConfigComponent,
        WorkStationConfigDialogComponent,
        WorkStationConfigPopupComponent,
        WorkStationConfigDeleteDialogComponent,
        WorkStationConfigDeletePopupComponent,
    ],
    providers: [
        WorkStationConfigService,
        WorkStationConfigPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi3WorkStationConfigModule {}
