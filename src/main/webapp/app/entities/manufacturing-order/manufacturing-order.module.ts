import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MMSSharedModule } from '../../shared';
import {
    ManufacturingOrderService,
    ManufacturingOrderPopupService,
    ManufacturingOrderComponent,
    ManufacturingOrderDetailComponent,
    ManufacturingOrderDialogComponent,
    ManufacturingOrderFullDialogComponent,
    ManufacturingOrderPopupComponent,
    ManufacturingOrderFullPopupComponent,
    ManufacturingOrderDeletePopupComponent,
    ManufacturingOrderSendPopupComponent,
    ManufacturingOrderDeleteDialogComponent,
    ManufacturingOrderSendDialogComponent,
    manufacturingOrderRoute,
    manufacturingOrderPopupRoute,
    manufacturingOrderFullPopupRoute,
    ManufacturingOrderResolvePagingParams
} from './';

const ENTITY_STATES = [
    ...manufacturingOrderRoute,
    ...manufacturingOrderPopupRoute,
    ...manufacturingOrderFullPopupRoute
];

@NgModule({
    imports: [
        MMSSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ManufacturingOrderComponent,
        ManufacturingOrderDetailComponent,
        ManufacturingOrderDialogComponent,
        ManufacturingOrderFullDialogComponent,
        ManufacturingOrderDeleteDialogComponent,
        ManufacturingOrderSendDialogComponent,
        ManufacturingOrderPopupComponent,
        ManufacturingOrderFullPopupComponent,
        ManufacturingOrderDeletePopupComponent,
        ManufacturingOrderSendPopupComponent,
    ],
    entryComponents: [
        ManufacturingOrderComponent,
        ManufacturingOrderDialogComponent,
        ManufacturingOrderFullDialogComponent,
        ManufacturingOrderPopupComponent,
        ManufacturingOrderFullPopupComponent,
        ManufacturingOrderDeleteDialogComponent,
        ManufacturingOrderSendDialogComponent,
        ManufacturingOrderDeletePopupComponent,
        ManufacturingOrderSendPopupComponent,
    ],
    providers: [
        ManufacturingOrderService,
        ManufacturingOrderPopupService,
        ManufacturingOrderResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MMSManufacturingOrderModule {}
