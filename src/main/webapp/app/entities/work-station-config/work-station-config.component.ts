import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WorkStationConfig } from './work-station-config.model';
import { WorkStationConfigService } from './work-station-config.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-work-station-config',
    templateUrl: './work-station-config.component.html'
})
export class WorkStationConfigComponent implements OnInit, OnDestroy {
workStationConfigs: WorkStationConfig[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private workStationConfigService: WorkStationConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.workStationConfigService.query().subscribe(
            (res: HttpResponse<WorkStationConfig[]>) => {
                this.workStationConfigs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkStationConfigs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WorkStationConfig) {
        return item.id;
    }
    registerChangeInWorkStationConfigs() {
        this.eventSubscriber = this.eventManager.subscribe('workStationConfigListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
