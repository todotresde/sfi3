import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi3SharedModule } from '../../shared';
import {
    SupplyService,
    SupplyPopupService,
    SupplyComponent,
    SupplyDetailComponent,
    SupplyDialogComponent,
    SupplyPopupComponent,
    SupplyDeletePopupComponent,
    SupplyDeleteDialogComponent,
    supplyRoute,
    supplyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplyRoute,
    ...supplyPopupRoute,
];

@NgModule({
    imports: [
        Sfi3SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplyComponent,
        SupplyDetailComponent,
        SupplyDialogComponent,
        SupplyDeleteDialogComponent,
        SupplyPopupComponent,
        SupplyDeletePopupComponent,
    ],
    entryComponents: [
        SupplyComponent,
        SupplyDialogComponent,
        SupplyPopupComponent,
        SupplyDeleteDialogComponent,
        SupplyDeletePopupComponent,
    ],
    providers: [
        SupplyService,
        SupplyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi3SupplyModule {}
