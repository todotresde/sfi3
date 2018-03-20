import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyTypeAttrValue } from './supply-type-attr-value.model';
import { SupplyTypeAttrValueService } from './supply-type-attr-value.service';

@Component({
    selector: 'jhi-supply-type-attr-value-detail',
    templateUrl: './supply-type-attr-value-detail.component.html'
})
export class SupplyTypeAttrValueDetailComponent implements OnInit, OnDestroy {

    supplyTypeAttrValue: SupplyTypeAttrValue;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private supplyTypeAttrValueService: SupplyTypeAttrValueService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSupplyTypeAttrValues();
    }

    load(id) {
        this.supplyTypeAttrValueService.find(id)
            .subscribe((supplyTypeAttrValueResponse: HttpResponse<SupplyTypeAttrValue>) => {
                this.supplyTypeAttrValue = supplyTypeAttrValueResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSupplyTypeAttrValues() {
        this.eventSubscriber = this.eventManager.subscribe(
            'supplyTypeAttrValueListModification',
            (response) => this.load(this.supplyTypeAttrValue.id)
        );
    }
}
