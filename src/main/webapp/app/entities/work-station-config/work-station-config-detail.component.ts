import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WorkStationConfig } from './work-station-config.model';
import { WorkStationConfigService } from './work-station-config.service';

@Component({
    selector: 'jhi-work-station-config-detail',
    templateUrl: './work-station-config-detail.component.html'
})
export class WorkStationConfigDetailComponent implements OnInit, OnDestroy {

    workStationConfig: WorkStationConfig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private workStationConfigService: WorkStationConfigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWorkStationConfigs();
    }

    load(id) {
        this.workStationConfigService.find(id)
            .subscribe((workStationConfigResponse: HttpResponse<WorkStationConfig>) => {
                this.workStationConfig = workStationConfigResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWorkStationConfigs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'workStationConfigListModification',
            (response) => this.load(this.workStationConfig.id)
        );
    }
}
