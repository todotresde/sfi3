import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SmallUUID, Status } from '../app.pipes';

import {
    Sfi3SharedLibsModule,
    Sfi3SharedCommonModule,
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
        Sfi3SharedLibsModule,
        Sfi3SharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        SmallUUID,
        Status
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
        Status
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        Sfi3SharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        SmallUUID,
        Status
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class Sfi3SharedModule {}
