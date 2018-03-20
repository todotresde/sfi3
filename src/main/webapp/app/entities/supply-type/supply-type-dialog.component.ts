import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplyType } from './supply-type.model';
import { SupplyTypePopupService } from './supply-type-popup.service';
import { SupplyTypeService } from './supply-type.service';
import { SupplyTypeAttr, SupplyTypeAttrService } from '../supply-type-attr';
import { WorkStationConfig, WorkStationConfigService } from '../work-station-config';

@Component({
    selector: 'jhi-supply-type-dialog',
    templateUrl: './supply-type-dialog.component.html'
})
export class SupplyTypeDialogComponent implements OnInit {

    supplyType: SupplyType;
    isSaving: boolean;

    supplytypeattrs: SupplyTypeAttr[];

    workstationconfigs: WorkStationConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private supplyTypeService: SupplyTypeService,
        private supplyTypeAttrService: SupplyTypeAttrService,
        private workStationConfigService: WorkStationConfigService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.supplyTypeAttrService.query()
            .subscribe((res: HttpResponse<SupplyTypeAttr[]>) => { this.supplytypeattrs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.workStationConfigService.query()
            .subscribe((res: HttpResponse<WorkStationConfig[]>) => { this.workstationconfigs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.supplyType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplyTypeService.update(this.supplyType));
        } else {
            this.subscribeToSaveResponse(
                this.supplyTypeService.create(this.supplyType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SupplyType>>) {
        result.subscribe((res: HttpResponse<SupplyType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SupplyType) {
        this.eventManager.broadcast({ name: 'supplyTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSupplyTypeAttrById(index: number, item: SupplyTypeAttr) {
        return item.id;
    }

    trackWorkStationConfigById(index: number, item: WorkStationConfig) {
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
    selector: 'jhi-supply-type-popup',
    template: ''
})
export class SupplyTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyTypePopupService: SupplyTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplyTypePopupService
                    .open(SupplyTypeDialogComponent as Component, params['id']);
            } else {
                this.supplyTypePopupService
                    .open(SupplyTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
