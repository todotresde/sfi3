import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplyTypeAttrValue } from './supply-type-attr-value.model';
import { SupplyTypeAttrValueService } from './supply-type-attr-value.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-supply-type-attr-value',
    templateUrl: './supply-type-attr-value.component.html'
})
export class SupplyTypeAttrValueComponent implements OnInit, OnDestroy {
supplyTypeAttrValues: SupplyTypeAttrValue[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supplyTypeAttrValueService: SupplyTypeAttrValueService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.supplyTypeAttrValueService.query().subscribe(
            (res: HttpResponse<SupplyTypeAttrValue[]>) => {
                this.supplyTypeAttrValues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSupplyTypeAttrValues();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SupplyTypeAttrValue) {
        return item.id;
    }
    registerChangeInSupplyTypeAttrValues() {
        this.eventSubscriber = this.eventManager.subscribe('supplyTypeAttrValueListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
