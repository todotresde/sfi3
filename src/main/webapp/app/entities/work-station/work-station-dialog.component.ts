import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WorkStation } from './work-station.model';
import { WorkStationPopupService } from './work-station-popup.service';
import { WorkStationService } from './work-station.service';
import { WorkStationConfig, WorkStationConfigService } from '../work-station-config';

@Component({
    selector: 'jhi-work-station-dialog',
    templateUrl: './work-station-dialog.component.html'
})
export class WorkStationDialogComponent implements OnInit {

    workStation: WorkStation;
    isSaving: boolean;

    workstationconfigs: WorkStationConfig[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private workStationService: WorkStationService,
        private workStationConfigService: WorkStationConfigService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.workStationConfigService.query()
            .subscribe((res: HttpResponse<WorkStationConfig[]>) => { this.workstationconfigs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.workStation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workStationService.update(this.workStation));
        } else {
            this.subscribeToSaveResponse(
                this.workStationService.create(this.workStation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WorkStation>>) {
        result.subscribe((res: HttpResponse<WorkStation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WorkStation) {
        this.eventManager.broadcast({ name: 'workStationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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
    selector: 'jhi-work-station-popup',
    template: ''
})
export class WorkStationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workStationPopupService: WorkStationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.workStationPopupService
                    .open(WorkStationDialogComponent as Component, params['id']);
            } else {
                this.workStationPopupService
                    .open(WorkStationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
