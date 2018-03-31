import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';

import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderService } from './manufacturing-order.service';
import { ITEMS_PER_PAGE, STATUS_CREATED, Principal } from '../../shared';

@Component({
    selector: 'jhi-manufacturing-order',
    templateUrl: './manufacturing-order.component.html'
})
export class ManufacturingOrderComponent implements OnInit, OnDestroy {
    manufacturingOrders: ManufacturingOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;
    // Paging
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    statusCreated: any;
    // Paging

    constructor(
        private manufacturingOrderService: ManufacturingOrderService,
        private jhiAlertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.statusCreated = STATUS_CREATED;
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.manufacturingOrderService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: HttpResponse<ManufacturingOrder[]>) => this.onSuccess(res.body, res.headers),
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

    // Paging
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/manufacturing-order'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/manufacturing-order', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    // Paging

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.manufacturingOrders = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
