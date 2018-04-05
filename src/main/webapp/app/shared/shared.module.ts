import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SmallUUID, Status, Sort } from '../app.pipes';

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
        Sort
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
        Sort
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        MMSSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        SmallUUID,
        Status,
        Sort
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MMSSharedModule {}
