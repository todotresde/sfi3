import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MMSSharedModule } from '../../shared';
import {
    TracerService,
    TracerPopupService,
    TracerComponent,
    TracerWorkStationComponent,
    TracerDetailComponent,
    TracerStartComponent,
    TracerStartPopupComponent,
    TracerStartCodeIpPopupComponent,
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
        MMSSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TracerComponent,
        TracerWorkStationComponent,
        TracerDetailComponent,
        TracerDialogComponent,
        TracerStartComponent,
        TracerStartPopupComponent,
        TracerStartCodeIpPopupComponent,
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
        TracerStartCodeIpPopupComponent,
        TracerPopupComponent,
        TracerDeleteDialogComponent,
        TracerDeletePopupComponent,
    ],
    providers: [
        TracerService,
        TracerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: []
})
export class MMSTracerModule {}
