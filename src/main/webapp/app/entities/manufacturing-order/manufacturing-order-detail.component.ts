import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderService } from './manufacturing-order.service';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';
import { SupplyType } from '../supply-type/supply-type.model';
import { SupplyTypeAttr } from '../supply-type-attr/supply-type-attr.model';
import { SupplyTypeAttrValue } from '../supply-type-attr-value/supply-type-attr-value.model';
import { SupplyTypeAttrValueService } from '../supply-type-attr-value/supply-type-attr-value.service';

@Component({
    selector: 'jhi-manufacturing-order-detail',
    templateUrl: './manufacturing-order-detail.component.html'
})
export class ManufacturingOrderDetailComponent implements OnInit, OnDestroy {

    manufacturingOrder: ManufacturingOrder;
    products: Product[];
    supplyTypeAttrValues: SupplyTypeAttrValue[];
    manufacturingOrderTimeToFinish: number;
    manufacturingOrderTimeToFinishDays: number;
    manufacturingOrderTimeToFinishHours: number;
    manufacturingOrderTimeToFinishMinutes: number;

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private manufacturingOrderService: ManufacturingOrderService,
        private productService: ProductService,
        private supplyTypeAttrValueService: SupplyTypeAttrValueService,
        private route: ActivatedRoute
    ) {
        this.manufacturingOrderTimeToFinish = 0;
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInManufacturingOrders();
    }

    load(id) {
        this.manufacturingOrderService.find(id)
            .subscribe((response: HttpResponse<ManufacturingOrder>) => {
                this.manufacturingOrder = response.body;
            });
        this.manufacturingOrderService.getTimeToFinish(id)
            .subscribe((response: HttpResponse<number>) => {
                this.manufacturingOrderTimeToFinish = response.body;
                console.log(this.manufacturingOrderTimeToFinish / 60);
                this.manufacturingOrderTimeToFinishDays =
                    Math.floor(((this.manufacturingOrderTimeToFinish / 60) / 60) / 8);
                this.manufacturingOrderTimeToFinishHours =
                    Math.floor(((this.manufacturingOrderTimeToFinish / 60) / 60) - this.manufacturingOrderTimeToFinishDays * 8);
                this.manufacturingOrderTimeToFinishMinutes =
                    Math.floor(this.manufacturingOrderTimeToFinish / 60) - (this.manufacturingOrderTimeToFinishDays * 8 * 60) - (this.manufacturingOrderTimeToFinishHours * 60);
            });
        this.productService.findByManufacturingOrder(id)
            .subscribe((response: HttpResponse<Product[]>) => {
                this.products = response.body;
            });
        this.supplyTypeAttrValueService.findByManufacturingOrder(id)
            .subscribe((response: HttpResponse<SupplyTypeAttrValue[]>) => {
                this.supplyTypeAttrValues = response.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInManufacturingOrders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'manufacturingOrderListModification',
            (response) => this.load(this.manufacturingOrder.id)
        );
    }

    getValueForSupplyTypeAttr(product: Product, supplyType: SupplyType, supplyTypeAttr: SupplyTypeAttr) {
        let supplyTypeAttrValues: SupplyTypeAttrValue[];
        if (this.supplyTypeAttrValues) {
            supplyTypeAttrValues = this.supplyTypeAttrValues.filter((supplyTypeAttrValue) => {
                return (
                    supplyTypeAttrValue.product.id === product.id &&
                    supplyTypeAttrValue.supplyType.id === supplyType.id &&
                    supplyTypeAttrValue.supplyTypeAttr.id === supplyTypeAttr.id
                );
            });
            return supplyTypeAttrValues[0].value;
        } else {
            return 0;
        }

    }
}
