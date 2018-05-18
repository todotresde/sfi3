import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LinearRegression } from './linear-regression.model';
import { LinearRegressionService } from './linear-regression.service';

@Component({
    selector: 'jhi-linear-regression-detail',
    templateUrl: './linear-regression-detail.component.html'
})
export class LinearRegressionDetailComponent implements OnInit, OnDestroy {

    linearRegression: LinearRegression;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private linearRegressionService: LinearRegressionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLinearRegressions();
    }

    load(id) {
        this.linearRegressionService.find(id)
            .subscribe((linearRegressionResponse: HttpResponse<LinearRegression>) => {
                this.linearRegression = linearRegressionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLinearRegressions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'linearRegressionListModification',
            (response) => this.load(this.linearRegression.id)
        );
    }
}
