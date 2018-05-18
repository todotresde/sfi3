import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MMSSharedModule } from '../../shared';
import {
    LinearRegressionService,
    LinearRegressionPopupService,
    LinearRegressionComponent,
    LinearRegressionDetailComponent,
    LinearRegressionDialogComponent,
    LinearRegressionPopupComponent,
    LinearRegressionDeletePopupComponent,
    LinearRegressionDeleteDialogComponent,
    linearRegressionRoute,
    linearRegressionPopupRoute,
    LinearRegressionResolvePagingParams
} from './';

const ENTITY_STATES = [
    ...linearRegressionRoute,
    ...linearRegressionPopupRoute,
];

@NgModule({
    imports: [
        MMSSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LinearRegressionComponent,
        LinearRegressionDetailComponent,
        LinearRegressionDialogComponent,
        LinearRegressionDeleteDialogComponent,
        LinearRegressionPopupComponent,
        LinearRegressionDeletePopupComponent,
    ],
    entryComponents: [
        LinearRegressionComponent,
        LinearRegressionDialogComponent,
        LinearRegressionPopupComponent,
        LinearRegressionDeleteDialogComponent,
        LinearRegressionDeletePopupComponent,
    ],
    providers: [
        LinearRegressionService,
        LinearRegressionPopupService,
        LinearRegressionResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MMSLinearRegressionModule {}
