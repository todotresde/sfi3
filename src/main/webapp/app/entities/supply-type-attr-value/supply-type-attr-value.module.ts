import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MMSSharedModule } from '../../shared';
import {
    SupplyTypeAttrValueService,
    SupplyTypeAttrValuePopupService,
    SupplyTypeAttrValueComponent,
    SupplyTypeAttrValueDetailComponent,
    SupplyTypeAttrValueDialogComponent,
    SupplyTypeAttrValuePopupComponent,
    SupplyTypeAttrValueDeletePopupComponent,
    SupplyTypeAttrValueDeleteDialogComponent,
    supplyTypeAttrValueRoute,
    supplyTypeAttrValuePopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplyTypeAttrValueRoute,
    ...supplyTypeAttrValuePopupRoute,
];

@NgModule({
    imports: [
        MMSSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplyTypeAttrValueComponent,
        SupplyTypeAttrValueDetailComponent,
        SupplyTypeAttrValueDialogComponent,
        SupplyTypeAttrValueDeleteDialogComponent,
        SupplyTypeAttrValuePopupComponent,
        SupplyTypeAttrValueDeletePopupComponent,
    ],
    entryComponents: [
        SupplyTypeAttrValueComponent,
        SupplyTypeAttrValueDialogComponent,
        SupplyTypeAttrValuePopupComponent,
        SupplyTypeAttrValueDeleteDialogComponent,
        SupplyTypeAttrValueDeletePopupComponent,
    ],
    providers: [
        SupplyTypeAttrValueService,
        SupplyTypeAttrValuePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MMSSupplyTypeAttrValueModule {}
