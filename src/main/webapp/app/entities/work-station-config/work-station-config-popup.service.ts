import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { WorkStationConfig } from './work-station-config.model';
import { WorkStationConfigService } from './work-station-config.service';

@Injectable()
export class WorkStationConfigPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private workStationConfigService: WorkStationConfigService

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
                this.workStationConfigService.find(id)
                    .subscribe((workStationConfigResponse: HttpResponse<WorkStationConfig>) => {
                        const workStationConfig: WorkStationConfig = workStationConfigResponse.body;
                        this.ngbModalRef = this.workStationConfigModalRef(component, workStationConfig);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.workStationConfigModalRef(component, new WorkStationConfig());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    workStationConfigModalRef(component: Component, workStationConfig: WorkStationConfig): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.workStationConfig = workStationConfig;
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
