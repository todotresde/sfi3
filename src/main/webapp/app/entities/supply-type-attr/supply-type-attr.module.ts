import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MMSSharedModule } from '../../shared';
import {
    SupplyTypeAttrService,
    SupplyTypeAttrPopupService,
    SupplyTypeAttrComponent,
    SupplyTypeAttrDetailComponent,
    SupplyTypeAttrDialogComponent,
    SupplyTypeAttrPopupComponent,
    SupplyTypeAttrDeletePopupComponent,
    SupplyTypeAttrDeleteDialogComponent,
    supplyTypeAttrRoute,
    supplyTypeAttrPopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplyTypeAttrRoute,
    ...supplyTypeAttrPopupRoute,
];

@NgModule({
    imports: [
        MMSSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplyTypeAttrComponent,
        SupplyTypeAttrDetailComponent,
        SupplyTypeAttrDialogComponent,
        SupplyTypeAttrDeleteDialogComponent,
        SupplyTypeAttrPopupComponent,
        SupplyTypeAttrDeletePopupComponent,
    ],
    entryComponents: [
        SupplyTypeAttrComponent,
        SupplyTypeAttrDialogComponent,
        SupplyTypeAttrPopupComponent,
        SupplyTypeAttrDeleteDialogComponent,
        SupplyTypeAttrDeletePopupComponent,
    ],
    providers: [
        SupplyTypeAttrService,
        SupplyTypeAttrPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MMSSupplyTypeAttrModule {}
