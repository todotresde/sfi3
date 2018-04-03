import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MMSSharedModule } from '../../shared';
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
        MMSSharedModule,
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
export class MMSWorkStationConfigModule {}
