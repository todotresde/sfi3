import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SupplyTypeAttr } from './supply-type-attr.model';
import { SupplyTypeAttrService } from './supply-type-attr.service';

@Injectable()
export class SupplyTypeAttrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private supplyTypeAttrService: SupplyTypeAttrService

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
                this.supplyTypeAttrService.find(id)
                    .subscribe((supplyTypeAttrResponse: HttpResponse<SupplyTypeAttr>) => {
                        const supplyTypeAttr: SupplyTypeAttr = supplyTypeAttrResponse.body;
                        this.ngbModalRef = this.supplyTypeAttrModalRef(component, supplyTypeAttr);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.supplyTypeAttrModalRef(component, new SupplyTypeAttr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    supplyTypeAttrModalRef(component: Component, supplyTypeAttr: SupplyTypeAttr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.supplyTypeAttr = supplyTypeAttr;
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
