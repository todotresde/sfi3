import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WorkStation } from './work-station.model';
import { WorkStationService } from './work-station.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-work-station',
    templateUrl: './work-station.component.html'
})
export class WorkStationComponent implements OnInit, OnDestroy {
workStations: WorkStation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private workStationService: WorkStationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.workStationService.query().subscribe(
            (res: HttpResponse<WorkStation[]>) => {
                this.workStations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkStations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WorkStation) {
        return item.id;
    }
    registerChangeInWorkStations() {
        this.eventSubscriber = this.eventManager.subscribe('workStationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
