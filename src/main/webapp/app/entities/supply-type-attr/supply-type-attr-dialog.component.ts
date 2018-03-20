import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SupplyTypeAttr } from './supply-type-attr.model';
import { SupplyTypeAttrPopupService } from './supply-type-attr-popup.service';
import { SupplyTypeAttrService } from './supply-type-attr.service';
import { SupplyType, SupplyTypeService } from '../supply-type';

@Component({
    selector: 'jhi-supply-type-attr-dialog',
    templateUrl: './supply-type-attr-dialog.component.html'
})
export class SupplyTypeAttrDialogComponent implements OnInit {

    supplyTypeAttr: SupplyTypeAttr;
    isSaving: boolean;

    supplytypes: SupplyType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private supplyTypeAttrService: SupplyTypeAttrService,
        private supplyTypeService: SupplyTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.supplyTypeService.query()
            .subscribe((res: HttpResponse<SupplyType[]>) => { this.supplytypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.supplyTypeAttr.id !== undefined) {
            this.subscribeToSaveResponse(
                this.supplyTypeAttrService.update(this.supplyTypeAttr));
        } else {
            this.subscribeToSaveResponse(
                this.supplyTypeAttrService.create(this.supplyTypeAttr));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SupplyTypeAttr>>) {
        result.subscribe((res: HttpResponse<SupplyTypeAttr>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SupplyTypeAttr) {
        this.eventManager.broadcast({ name: 'supplyTypeAttrListModification', content: 'OK'});
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
    selector: 'jhi-supply-type-attr-popup',
    template: ''
})
export class SupplyTypeAttrPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyTypeAttrPopupService: SupplyTypeAttrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.supplyTypeAttrPopupService
                    .open(SupplyTypeAttrDialogComponent as Component, params['id']);
            } else {
                this.supplyTypeAttrPopupService
                    .open(SupplyTypeAttrDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
