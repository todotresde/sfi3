import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyTypeAttr } from './supply-type-attr.model';
import { SupplyTypeAttrService } from './supply-type-attr.service';

@Component({
    selector: 'jhi-supply-type-attr-detail',
    templateUrl: './supply-type-attr-detail.component.html'
})
export class SupplyTypeAttrDetailComponent implements OnInit, OnDestroy {

    supplyTypeAttr: SupplyTypeAttr;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private supplyTypeAttrService: SupplyTypeAttrService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSupplyTypeAttrs();
    }

    load(id) {
        this.supplyTypeAttrService.find(id)
            .subscribe((supplyTypeAttrResponse: HttpResponse<SupplyTypeAttr>) => {
                this.supplyTypeAttr = supplyTypeAttrResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSupplyTypeAttrs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'supplyTypeAttrListModification',
            (response) => this.load(this.supplyTypeAttr.id)
        );
    }
}
