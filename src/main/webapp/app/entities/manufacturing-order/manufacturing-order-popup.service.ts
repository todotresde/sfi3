import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderService } from './manufacturing-order.service';
import { SupplyService } from '../supply/supply.service';
import { ManufacturingOrderDTO } from '../manufacturing-order-dto/manufacturing-order-dto.model';
import { SupplyTypeAttrValue } from '../supply-type-attr-value/supply-type-attr-value.model';
import { Supply } from '../supply/supply.model';
import { SupplyType } from '../supply-type/supply-type.model';
import { SupplyTypeAttr } from '../supply-type-attr/supply-type-attr.model';
import { Product } from '../product/product.model';
import { JhiAlertService } from 'ng-jhipster';
import { STATUS_CREATED } from '../../shared';

@Injectable()
export class ManufacturingOrderPopupService {
    private ngbModalRef: NgbModalRef;
    private supplies: Supply[];

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private manufacturingOrderService: ManufacturingOrderService,
        private supplyService: SupplyService,
        private jhiAlertService: JhiAlertService,

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        this.loadSupplies();

        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.manufacturingOrderService.findFull(id)
                    .subscribe((manufacturingOrderResponse: HttpResponse<ManufacturingOrder>) => {
                        const manufacturingOrderDTO: ManufacturingOrderDTO = manufacturingOrderResponse.body;
                        this.ngbModalRef = this.manufacturingOrderModalRef(component, manufacturingOrderDTO);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.manufacturingOrderNewModalRef(component, new ManufacturingOrder());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    manufacturingOrderModalRef(component: Component, manufacturingOrderDTO: ManufacturingOrderDTO): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        const manufacturingOrder: ManufacturingOrder = manufacturingOrderDTO.manufacturingOrder;
        manufacturingOrder.orderDate = this.datePipe.transform(manufacturingOrder.orderDate, 'yyyy-MM-ddTHH:mm:ss');
        modalRef.componentInstance.manufacturingOrder = manufacturingOrder;
        modalRef.componentInstance.products = manufacturingOrderDTO.products;
        modalRef.componentInstance.supplyTypeAttrValues = manufacturingOrderDTO.supplyTypeAttrValues;

        modalRef.componentInstance.attributeValues = [];
        modalRef.componentInstance.supplies = this.supplies;

        for (let productPosition = 0; productPosition < modalRef.componentInstance.products.length; productPosition++) {
            const product: Product = modalRef.componentInstance.products[productPosition];
            const supplies: Supply[] = modalRef.componentInstance.products[productPosition].supplies;
            for (let supplyPosition = 0; supplyPosition < supplies.length; supplyPosition++) {
                const supply: Supply = supplies[supplyPosition];
                const supplyType: SupplyType = supply.supplyType;
                const supplyTypeAttrs: SupplyTypeAttr[] = supplyType.supplyTypeAttrs;

                for (let supplyTypeAttrPosition = 0; supplyTypeAttrPosition < supplyTypeAttrs.length; supplyTypeAttrPosition++) {
                    const supplyTypeAttr: SupplyTypeAttr = supplyTypeAttrs[supplyTypeAttrPosition];

                    for (let supplyTypeAttrValuePosition = 0; supplyTypeAttrValuePosition < modalRef.componentInstance.supplyTypeAttrValues.length; supplyTypeAttrValuePosition++) {
                        const supplyTypeAttrValue: SupplyTypeAttrValue = modalRef.componentInstance.supplyTypeAttrValues[supplyTypeAttrValuePosition];

                        if (supplyTypeAttrValue.product.id === product.id
                            && supplyTypeAttrValue.supply.id === supply.id
                            && supplyTypeAttrValue.supplyTypeAttr.id === supplyTypeAttr.id ) {
                            if (!modalRef.componentInstance.attributeValues[productPosition]) {
                                modalRef.componentInstance.attributeValues[productPosition] = [];
                            }
                            if (!modalRef.componentInstance.attributeValues[productPosition][supplyPosition]) {
                                modalRef.componentInstance.attributeValues[productPosition][supplyPosition] = {};
                            }

                            modalRef.componentInstance.attributeValues[productPosition][supplyPosition][supplyTypeAttr.name] = supplyTypeAttrValue.value;
                        }
                    }
                }
            }
        }

        /*
        let productPosition = -1;
        let supplyPosition = -1;
        let productId = -1;
        let supplyId = -1;
        let supplyChange = false;
        for (let supplyTypeAttrValuePosition = 0; supplyTypeAttrValuePosition < modalRef.componentInstance.supplyTypeAttrValues.length; supplyTypeAttrValuePosition++) {
            const supplyTypeAttrValue: SupplyTypeAttrValue = modalRef.componentInstance.supplyTypeAttrValues[supplyTypeAttrValuePosition];
            const supplyTypeAttr: SupplyTypeAttr = supplyTypeAttrValue.supplyTypeAttr;
            const supply: Supply = supplyTypeAttrValue.supply;
            const product: Product = supplyTypeAttrValue.product;

            if (productId !== product.id) {
                productPosition++;
                productId = product.id;
                supplyPosition = 0;
                supplyId = supply.id;
                supplyChange = true;
            } else {
                if (supplyId !== supply.id) {
                    supplyPosition++;
                    supplyId = supply.id;
                    supplyChange = true;
                }
            }
            if (!modalRef.componentInstance.products[productPosition].supplies) {
                modalRef.componentInstance.products[productPosition].supplies = [];
            }
            if (supplyChange) {
                modalRef.componentInstance.products[productPosition].supplies.push(supply);
                supplyChange = false;
            }
            if (!modalRef.componentInstance.products[productPosition]
                .supplies[modalRef.componentInstance.products[productPosition].supplies.length - 1]
                .supplyType.supplyTypeAttrs) {
                modalRef.componentInstance.products[productPosition]
                    .supplies[modalRef.componentInstance.products[productPosition].supplies.length - 1]
                    .supplyType.supplyTypeAttrs = [];
            }
            modalRef.componentInstance.products[productPosition]
                .supplies[modalRef.componentInstance.products[productPosition]
                .supplies.length - 1].supplyType.supplyTypeAttrs.push(supplyTypeAttr);
            if (!modalRef.componentInstance.attributeValues[productPosition]) {
                modalRef.componentInstance.attributeValues[productPosition] = [];
            }
            if (!modalRef.componentInstance.attributeValues[productPosition][supplyPosition]) {
                modalRef.componentInstance.attributeValues[productPosition][supplyPosition] = {};
            }

            modalRef.componentInstance.attributeValues[productPosition][supplyPosition][supplyTypeAttr.name] = supplyTypeAttrValue.value;
        }
        */
        console.log('LEO', modalRef.componentInstance);

        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }

    manufacturingOrderNewModalRef(component: Component, manufacturingOrder: ManufacturingOrder): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});

        manufacturingOrder.status = STATUS_CREATED;
        manufacturingOrder.orderDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
        modalRef.componentInstance.manufacturingOrder = manufacturingOrder;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }

    private loadSupplies() {
        this.supplyService.queryAll().subscribe(
            (res: HttpResponse<Supply[]>) => {
                this.supplies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
