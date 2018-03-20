import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Line } from './line.model';
import { LineService } from './line.service';

@Component({
    selector: 'jhi-line-detail',
    templateUrl: './line-detail.component.html'
})
export class LineDetailComponent implements OnInit, OnDestroy {

    line: Line;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lineService: LineService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLines();
    }

    load(id) {
        this.lineService.find(id)
            .subscribe((lineResponse: HttpResponse<Line>) => {
                this.line = lineResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lineListModification',
            (response) => this.load(this.line.id)
        );
    }
}
