import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Line } from './line.model';
import { LineService } from './line.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-line',
    templateUrl: './line.component.html'
})
export class LineComponent implements OnInit, OnDestroy {
    lines: Line[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private lineService: LineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.lineService.query().subscribe(
            (res: HttpResponse<Line[]>) => {
                this.lines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Line) {
        return item.id;
    }
    registerChangeInLines() {
        this.eventSubscriber = this.eventManager.subscribe('lineListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
