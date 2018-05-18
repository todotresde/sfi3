import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LinearRegression } from './linear-regression.model';
import { LinearRegressionService } from './linear-regression.service';

@Injectable()
export class LinearRegressionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private linearRegressionService: LinearRegressionService

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
                this.linearRegressionService.find(id)
                    .subscribe((linearRegressionResponse: HttpResponse<LinearRegression>) => {
                        const linearRegression: LinearRegression = linearRegressionResponse.body;
                        this.ngbModalRef = this.linearRegressionModalRef(component, linearRegression);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.linearRegressionModalRef(component, new LinearRegression());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    linearRegressionModalRef(component: Component, linearRegression: LinearRegression): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.linearRegression = linearRegression;
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
