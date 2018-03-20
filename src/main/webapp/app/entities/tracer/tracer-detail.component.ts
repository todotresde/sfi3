import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Tracer } from './tracer.model';
import { TracerService } from './tracer.service';

@Component({
    selector: 'jhi-tracer-detail',
    templateUrl: './tracer-detail.component.html'
})
export class TracerDetailComponent implements OnInit, OnDestroy {

    tracer: Tracer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tracerService: TracerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTracers();
    }

    load(id) {
        this.tracerService.find(id)
            .subscribe((tracerResponse: HttpResponse<Tracer>) => {
                this.tracer = tracerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTracers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tracerListModification',
            (response) => this.load(this.tracer.id)
        );
    }
}
