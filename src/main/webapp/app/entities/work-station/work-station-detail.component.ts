import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WorkStation } from './work-station.model';
import { WorkStationService } from './work-station.service';

@Component({
    selector: 'jhi-work-station-detail',
    templateUrl: './work-station-detail.component.html'
})
export class WorkStationDetailComponent implements OnInit, OnDestroy {

    workStation: WorkStation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private workStationService: WorkStationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWorkStations();
    }

    load(id) {
        this.workStationService.find(id)
            .subscribe((workStationResponse: HttpResponse<WorkStation>) => {
                this.workStation = workStationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWorkStations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'workStationListModification',
            (response) => this.load(this.workStation.id)
        );
    }
}
