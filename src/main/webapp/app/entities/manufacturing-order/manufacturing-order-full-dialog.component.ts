import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderPopupService } from './manufacturing-order-popup.service';
import { ManufacturingOrderService } from './manufacturing-order.service';
import { Product } from '../product/product.model';
import { Supply } from '../supply/supply.model';
import { SupplyService } from '../supply/supply.service';
import { SupplyType } from '../supply-type/supply-type.model';
import { SupplyTypeService } from '../supply-type/supply-type.service';
import { SupplyTypeAttr } from '../supply-type-attr/supply-type-attr.model';
import { SupplyTypeAttrValue } from '../supply-type-attr-value/supply-type-attr-value.model';

@Component({
    selector: 'jhi-manufacturing-order-full-dialog',
    templateUrl: './manufacturing-order-full-dialog.component.html'
})
export class ManufacturingOrderFullDialogComponent implements OnInit {

    manufacturingOrder: ManufacturingOrder;
    isSaving: boolean;
    products: Product[] = [];
    supplies: Supply[];
    currentSupply: Supply;
    attributeValues: any = [];
    supplyTypeAttrValues: SupplyTypeAttrValue[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private manufacturingOrderService: ManufacturingOrderService,
        private eventManager: JhiEventManager,
        private supplyService: SupplyService,
        private supplyTypeService: SupplyTypeService,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.loadSupplies();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.prepareSupplyTypeAttrValues();
        this.isSaving = true;
        if (this.manufacturingOrder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.manufacturingOrderService.fullUpdate(this.manufacturingOrder, this.products, this.supplyTypeAttrValues));
        } else {
            this.subscribeToSaveResponse(
                this.manufacturingOrderService.fullCreate(this.manufacturingOrder, this.products, this.supplyTypeAttrValues));
        }
    }

    addProduct() {
        const product: Product = new Product();
        product.supplies = [];
        this.products.push(product);
        this.addSupply(product);
    }

    addSupply(product: Product) {
        product.supplies.push(new Supply());
    }

    deleteProduct(productPosition: number) {
        this.products.splice(productPosition, 1);
        this.attributeValues.splice(productPosition, 1);
    }

    deleteSupply(productPosition: number, supplyPosition: number) {
        this.products[productPosition].supplies.splice(supplyPosition, 1);
        this.attributeValues[productPosition].splice(supplyPosition, 1);
    }

    onChangeSupply(supplyOptionId: string, productPosition: number, supplyPosition: number) {
        const updateSupply: Supply = this.supplies.filter((res: Supply) => res.id === parseInt(supplyOptionId, 10)).pop();

        this.supplyTypeService.find(updateSupply.supplyType.id).subscribe(
            (res: HttpResponse<SupplyType>) => {
                updateSupply.supplyType = res.body;
                this.products[productPosition].supplies[supplyPosition] = updateSupply;
                this.createAttributeValues(productPosition, supplyPosition, updateSupply.supplyType);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private prepareSupplyTypeAttrValues() {
        this.supplyTypeAttrValues = [];
        for (let productPosition = 0; productPosition < this.attributeValues.length; productPosition++) {
            for (let supplyPosition = 0; supplyPosition < this.attributeValues[productPosition].length; supplyPosition++) {
                for (const attributeName in this.attributeValues[productPosition][supplyPosition]) {
                    if (this.attributeValues[productPosition][supplyPosition][attributeName]) {
                        const value: any = this.attributeValues[productPosition][supplyPosition][attributeName];
                        const supplyTypeAttrValue = new SupplyTypeAttrValue();
                        const supply: Supply = this.products[productPosition].supplies[supplyPosition];
                        const supplyType: SupplyType = supply.supplyType;

                        supplyTypeAttrValue.value = value;
                        supplyTypeAttrValue.product = this.products[productPosition];
                        supplyTypeAttrValue.supply = supply;
                        supplyTypeAttrValue.supplyType = supplyType;
                        supplyType.supplyTypeAttrs.forEach((supplyTypeAttr: SupplyTypeAttr) => {
                            if (supplyTypeAttr.name === attributeName) {
                                supplyTypeAttrValue.supplyTypeAttr = supplyTypeAttr;
                            }
                        });

                        this.supplyTypeAttrValues.push(supplyTypeAttrValue);
                    }
                }
            }
        }
    }

    private createAttributeValues(productPosition: number, supplyPosition: number, supplyType: SupplyType) {
        if (!this.attributeValues[productPosition]) {
            this.attributeValues[productPosition] = [];
        }
        if (!this.attributeValues[productPosition][supplyPosition]) {
            this.attributeValues[productPosition][supplyPosition] = {};
        }

        supplyType.supplyTypeAttrs.forEach((supplyTypeAttr: any) => {
            if (!this.attributeValues[productPosition][supplyPosition][supplyTypeAttr.name]) {
                this.attributeValues[productPosition][supplyPosition][supplyTypeAttr.name] = 0;
            }
        });
    }

    private loadSupplies() {
        this.supplyService.query().subscribe(
            (res: HttpResponse<Supply[]>) => {
                this.supplies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ManufacturingOrder>>) {
        result.subscribe((res: HttpResponse<ManufacturingOrder>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ManufacturingOrder) {
        this.eventManager.broadcast({ name: 'manufacturingOrderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-manufacturing-order-full-popup',
    template: ''
})
export class ManufacturingOrderFullPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private manufacturingOrderPopupService: ManufacturingOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.manufacturingOrderPopupService
                    .open(ManufacturingOrderFullDialogComponent as Component, params['id']);
            } else {
                this.manufacturingOrderPopupService
                    .open(ManufacturingOrderFullDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
