import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SupplyTypeAttrValue } from './supply-type-attr-value.model';
import { SupplyTypeAttrValueService } from './supply-type-attr-value.service';

@Injectable()
export class SupplyTypeAttrValuePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private supplyTypeAttrValueService: SupplyTypeAttrValueService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.supplyTypeAttrValueService.find(id)
                    .subscribe((supplyTypeAttrValueResponse: HttpResponse<SupplyTypeAttrValue>) => {
                        const supplyTypeAttrValue: SupplyTypeAttrValue = supplyTypeAttrValueResponse.body;
                        this.ngbModalRef = this.supplyTypeAttrValueModalRef(component, supplyTypeAttrValue);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.supplyTypeAttrValueModalRef(component, new SupplyTypeAttrValue());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    supplyTypeAttrValueModalRef(component: Component, supplyTypeAttrValue: SupplyTypeAttrValue): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.supplyTypeAttrValue = supplyTypeAttrValue;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
