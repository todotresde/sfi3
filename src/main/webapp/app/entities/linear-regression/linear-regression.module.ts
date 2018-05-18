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
    LinearRegressionLearnPopupComponent,
    LinearRegressionLearnDialogComponent,
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
        LinearRegressionLearnPopupComponent,
        LinearRegressionLearnDialogComponent,
        LinearRegressionPopupComponent,
        LinearRegressionDeletePopupComponent,
    ],
    entryComponents: [
        LinearRegressionComponent,
        LinearRegressionDialogComponent,
        LinearRegressionPopupComponent,
        LinearRegressionDeleteDialogComponent,
        LinearRegressionDeletePopupComponent,
        LinearRegressionLearnPopupComponent,
        LinearRegressionLearnDialogComponent
    ],
    providers: [
        LinearRegressionService,
        LinearRegressionPopupService,
        LinearRegressionResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MMSLinearRegressionModule {}
