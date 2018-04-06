import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Tracer } from './tracer.model';
import { TracerService } from './tracer.service';
import { WorkStation } from '../work-station/work-station.model';
import { WorkStationService } from '../work-station/work-station.service';
import { UserService } from '../../shared/user/user.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tracer-workstation',
    templateUrl: './tracer-workstation.component.html'
})
export class TracerWorkStationComponent implements OnInit, OnDestroy {
    tracers: Tracer[];
    workStation: WorkStation;
    currentAccount: any;
    eventSubscriber: Subscription;
    eventSubscribeReload: Subscription;
    workStationIP: string;
    code = '';

    constructor(
        private tracerService: TracerService,
        private workStationService: WorkStationService,
        private userService: UserService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute
    ) {
        // Necessary to reload when th WorkStationIP changes.
        route.params.subscribe((val) => {
            this.ngOnInit();
        });
        this.eventSubscribeReload = Observable.interval(60000).subscribe((time) => this.loadAll());
    }

    loadAll() {
        this.tracerService.queryByWorkStationIP(this.workStationIP).subscribe(
            (res: HttpResponse<Tracer[]>) => {
                this.tracers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.workStationService.findByIP(this.workStationIP).subscribe(
            (res: HttpResponse<WorkStation>) => {
                this.workStation = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTracers();
        this.setWorkStationIP();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.eventSubscribeReload.unsubscribe();
    }

    trackId(index: number, item: Tracer) {
        return item.id;
    }
    registerChangeInTracers() {
        this.eventSubscriber = this.eventManager.subscribe('tracerListModification', (response) => this.loadAll());
    }
    loadTrace(code: string) {
        this.code = code;
    }
    setWorkStationIP() {
        this.workStationIP = this.route.snapshot.paramMap.get('ip');

        if (!this.workStationIP) {
            this.userService.getIP('anonymous').subscribe((res) => {
                this.workStationIP = res[0];
                this.loadAll();
            });
        } else {
            this.loadAll();
        }
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
