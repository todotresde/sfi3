import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi3SharedModule } from '../../shared';
import {
    TracerService,
    TracerPopupService,
    TracerComponent,
    TracerWorkStationComponent,
    TracerDetailComponent,
    TracerStartComponent,
    TracerStartPopupComponent,
    TracerDialogComponent,
    TracerPopupComponent,
    TracerDeletePopupComponent,
    TracerDeleteDialogComponent,
    tracerRoute,
    tracerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tracerRoute,
    ...tracerPopupRoute,
];

@NgModule({
    imports: [
        Sfi3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TracerComponent,
        TracerWorkStationComponent,
        TracerDetailComponent,
        TracerDialogComponent,
        TracerStartComponent,
        TracerStartPopupComponent,
        TracerDeleteDialogComponent,
        TracerPopupComponent,
        TracerDeletePopupComponent
    ],
    entryComponents: [
        TracerComponent,
        TracerWorkStationComponent,
        TracerDialogComponent,
        TracerStartComponent,
        TracerStartPopupComponent,
        TracerPopupComponent,
        TracerDeleteDialogComponent,
        TracerDeletePopupComponent,
    ],
    providers: [
        TracerService,
        TracerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi3TracerModule {}
