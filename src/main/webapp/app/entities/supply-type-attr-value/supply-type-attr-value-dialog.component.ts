import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplyTypeAttrValue } from './supply-type-attr-value.model';
import { SupplyTypeAttrValuePopupService } from './supply-type-attr-value-popup.service';
import { SupplyTypeAttrValueService } from './supply-type-attr-value.service';
import { Product, ProductService } from '../product';
import { Supply, SupplyService } from '../supply';
import { SupplyType, SupplyTypeService } from '../supply-type';
import { SupplyTypeAttr, SupplyTypeAttrService } from '../supply-type-attr';
import { ManufacturingOrder, ManufacturingOrderService } from '../manufacturing-order';

@Component({
    selector: 'jhi-supply-type-attr-value-dialog',
    templateUrl: './supply-type-attr-value-dialog.component.html'
})
export class SupplyTypeAttrValueDialogComponent implements OnInit {

    supplyTypeAttrValue: SupplyTypeAttrValue;
    isSaving: boolean;

    products: Product[];

    supplies: Supply[];

    supplytypes: SupplyType[];

    supplytypeattrs: SupplyTypeAttr[];

    manufacturingorders: ManufacturingOrder[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private supplyTypeAttrValueService: SupplyTypeAttrValueService,
        private productService: ProductService,
        private supplyService: SupplyService,
        private supplyTypeService: SupplyTypeService,
        private supplyTypeAttrService: SupplyTypeAttrService,
        private manufacturingOrderService: ManufacturingOrderService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyService.query()
            .subscribe((res: HttpResponse<Supply[]>) => { this.supplies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyTypeService.query()
            .subscribe((res: HttpResponse<SupplyType[]>) => { this.supplytypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyTypeAttrService.query()
            .subscribe((res: HttpResponse<SupplyTypeAttr[]>) => { this.supplytypeattrs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.manufacturingOrderService.query()
            .subscribe((res: HttpResponse<ManufacturingOrder[]>) => { this.manufacturingorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.supplyTypeAttrValue.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplyTypeAttrValueService.update(this.supplyTypeAttrValue));
        } else {
            this.subscribeToSaveResponse(
                this.supplyTypeAttrValueService.create(this.supplyTypeAttrValue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SupplyTypeAttrValue>>) {
        result.subscribe((res: HttpResponse<SupplyTypeAttrValue>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SupplyTypeAttrValue) {
        this.eventManager.broadcast({ name: 'supplyTypeAttrValueListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackSupplyById(index: number, item: Supply) {
        return item.id;
    }

    trackSupplyTypeById(index: number, item: SupplyType) {
        return item.id;
    }

    trackSupplyTypeAttrById(index: number, item: SupplyTypeAttr) {
        return item.id;
    }

    trackManufacturingOrderById(index: number, item: ManufacturingOrder) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-supply-type-attr-value-popup',
    template: ''
})
export class SupplyTypeAttrValuePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyTypeAttrValuePopupService: SupplyTypeAttrValuePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplyTypeAttrValuePopupService
                    .open(SupplyTypeAttrValueDialogComponent as Component, params['id']);
            } else {
                this.supplyTypeAttrValuePopupService
                    .open(SupplyTypeAttrValueDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
