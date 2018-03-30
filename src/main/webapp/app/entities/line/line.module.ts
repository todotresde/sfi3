import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi3SharedModule } from '../../shared';
import {
    LineService,
    LinePopupService,
    LineComponent,
    LineStatusComponent,
    LineDetailComponent,
    LineDialogComponent,
    LinePopupComponent,
    LineDeletePopupComponent,
    LineDeleteDialogComponent,
    lineRoute,
    linePopupRoute,
} from './';

const ENTITY_STATES = [
    ...lineRoute,
    ...linePopupRoute,
];

@NgModule({
    imports: [
        Sfi3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LineComponent,
        LineStatusComponent,
        LineDetailComponent,
        LineDialogComponent,
        LineDeleteDialogComponent,
        LinePopupComponent,
        LineDeletePopupComponent
    ],
    entryComponents: [
        LineComponent,
        LineStatusComponent,
        LineDialogComponent,
        LinePopupComponent,
        LineDeleteDialogComponent,
        LineDeletePopupComponent,
    ],
    providers: [
        LineService,
        LinePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi3LineModule {}
