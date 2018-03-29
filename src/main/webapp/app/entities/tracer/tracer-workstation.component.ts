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
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tracer',
    templateUrl: './tracer-workstation.component.html'
})
export class TracerWorkStationComponent implements OnInit, OnDestroy {
    tracers: Tracer[];
    workStation: WorkStation;
    currentAccount: any;
    eventSubscriber: Subscription;
    eventSubscribeReload: Subscription;
    workStationIP: string;

    constructor(
        private tracerService: TracerService,
        private workStationService: WorkStationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute
    ) {
        route.params.subscribe((val) => {
            this.ngOnInit();
        });
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
        this.workStationIP = this.route.snapshot.paramMap.get('ip');
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTracers();
        this.loadAll();
        this.eventSubscribeReload = Observable.interval(60000).subscribe((time) => this.loadAll());
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

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
