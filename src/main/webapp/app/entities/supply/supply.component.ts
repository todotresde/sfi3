import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Supply } from './supply.model';
import { SupplyService } from './supply.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-supply',
    templateUrl: './supply.component.html'
})
export class SupplyComponent implements OnInit, OnDestroy {
supplies: Supply[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private supplyService: SupplyService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.supplyService.query().subscribe(
            (res: HttpResponse<Supply[]>) => {
                this.supplies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSupplies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Supply) {
        return item.id;
    }
    registerChangeInSupplies() {
        this.eventSubscriber = this.eventManager.subscribe('supplyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
