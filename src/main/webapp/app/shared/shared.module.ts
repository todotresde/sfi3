import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SmallUUID, Status, Sort } from '../app.pipes';
import { HighchartsChartComponent } from './components/highcharts-chart.component';

import {
    MMSSharedLibsModule,
    MMSSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
} from './';

@NgModule({
    imports: [
        MMSSharedLibsModule,
        MMSSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        SmallUUID,
        Status,
        Sort,
        HighchartsChartComponent
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe,
        SmallUUID,
        Status,
        Sort,
        HighchartsChartComponent
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        MMSSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        SmallUUID,
        Status,
        Sort,
        HighchartsChartComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MMSSharedModule {}
