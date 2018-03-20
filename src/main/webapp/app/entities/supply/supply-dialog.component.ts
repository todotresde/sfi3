import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Supply } from './supply.model';
import { SupplyPopupService } from './supply-popup.service';
import { SupplyService } from './supply.service';
import { SupplyType, SupplyTypeService } from '../supply-type';
import { Product, ProductService } from '../product';

@Component({
    selector: 'jhi-supply-dialog',
    templateUrl: './supply-dialog.component.html'
})
export class SupplyDialogComponent implements OnInit {

    supply: Supply;
    isSaving: boolean;

    supplytypes: SupplyType[];

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private supplyService: SupplyService,
        private supplyTypeService: SupplyTypeService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.supplyTypeService.query()
            .subscribe((res: HttpResponse<SupplyType[]>) => { this.supplytypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.supply.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplyService.update(this.supply));
        } else {
            this.subscribeToSaveResponse(
                this.supplyService.create(this.supply));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Supply>>) {
        result.subscribe((res: HttpResponse<Supply>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Supply) {
        this.eventManager.broadcast({ name: 'supplyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSupplyTypeById(index: number, item: SupplyType) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-supply-popup',
    template: ''
})
export class SupplyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyPopupService: SupplyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplyPopupService
                    .open(SupplyDialogComponent as Component, params['id']);
            } else {
                this.supplyPopupService
                    .open(SupplyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
