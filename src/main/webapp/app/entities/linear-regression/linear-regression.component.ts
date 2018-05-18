import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';

import { LinearRegression } from './linear-regression.model';
import { LinearRegressionService } from './linear-regression.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-linear-regression',
    templateUrl: './linear-regression.component.html'
})
export class LinearRegressionComponent implements OnInit, OnDestroy {
    linearRegressions: LinearRegression[];
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
    // Paging
    constructor(
        private linearRegressionService: LinearRegressionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    loadAll() {
        this.linearRegressionService.query().subscribe(
            (res: HttpResponse<LinearRegression[]>) => {
                this.linearRegressions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLinearRegressions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LinearRegression) {
        return item.id;
    }
    registerChangeInLinearRegressions() {
        this.eventSubscriber = this.eventManager.subscribe('linearRegressionListModification', (response) => this.loadAll());
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

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
