import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplyTypeAttr } from './supply-type-attr.model';
import { SupplyTypeAttrService } from './supply-type-attr.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-supply-type-attr',
    templateUrl: './supply-type-attr.component.html'
})
export class SupplyTypeAttrComponent implements OnInit, OnDestroy {
supplyTypeAttrs: SupplyTypeAttr[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supplyTypeAttrService: SupplyTypeAttrService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.supplyTypeAttrService.query().subscribe(
            (res: HttpResponse<SupplyTypeAttr[]>) => {
                this.supplyTypeAttrs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSupplyTypeAttrs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SupplyTypeAttr) {
        return item.id;
    }
    registerChangeInSupplyTypeAttrs() {
        this.eventSubscriber = this.eventManager.subscribe('supplyTypeAttrListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
