import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderService } from './manufacturing-order.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-manufacturing-order',
    templateUrl: './manufacturing-order.component.html'
})
export class ManufacturingOrderComponent implements OnInit, OnDestroy {
manufacturingOrders: ManufacturingOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private manufacturingOrderService: ManufacturingOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.manufacturingOrderService.query().subscribe(
            (res: HttpResponse<ManufacturingOrder[]>) => {
                this.manufacturingOrders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInManufacturingOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ManufacturingOrder) {
        return item.id;
    }
    registerChangeInManufacturingOrders() {
        this.eventSubscriber = this.eventManager.subscribe('manufacturingOrderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
