import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WorkStationConfig } from './work-station-config.model';
import { WorkStationConfigPopupService } from './work-station-config-popup.service';
import { WorkStationConfigService } from './work-station-config.service';
import { WorkStation, WorkStationService } from '../work-station';
import { SupplyType, SupplyTypeService } from '../supply-type';
import { Employee, EmployeeService } from '../employee';
import { Line, LineService } from '../line';

@Component({
    selector: 'jhi-work-station-config-dialog',
    templateUrl: './work-station-config-dialog.component.html'
})
export class WorkStationConfigDialogComponent implements OnInit {

    workStationConfig: WorkStationConfig;
    isSaving: boolean;

    workstations: WorkStation[];

    supplytypes: SupplyType[];

    employees: Employee[];

    lines: Line[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private workStationConfigService: WorkStationConfigService,
        private workStationService: WorkStationService,
        private supplyTypeService: SupplyTypeService,
        private employeeService: EmployeeService,
        private lineService: LineService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.workStationService.query()
            .subscribe((res: HttpResponse<WorkStation[]>) => { this.workstations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyTypeService.query()
            .subscribe((res: HttpResponse<SupplyType[]>) => { this.supplytypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.employeeService.query()
            .subscribe((res: HttpResponse<Employee[]>) => { this.employees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.lineService.query()
            .subscribe((res: HttpResponse<Line[]>) => { this.lines = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.workStationConfig.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workStationConfigService.update(this.workStationConfig));
        } else {
            this.subscribeToSaveResponse(
                this.workStationConfigService.create(this.workStationConfig));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WorkStationConfig>>) {
        result.subscribe((res: HttpResponse<WorkStationConfig>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WorkStationConfig) {
        this.eventManager.broadcast({ name: 'workStationConfigListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackWorkStationById(index: number, item: WorkStation) {
        return item.id;
    }

    trackSupplyTypeById(index: number, item: SupplyType) {
        return item.id;
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }

    trackLineById(index: number, item: Line) {
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
    selector: 'jhi-work-station-config-popup',
    template: ''
})
export class WorkStationConfigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workStationConfigPopupService: WorkStationConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.workStationConfigPopupService
                    .open(WorkStationConfigDialogComponent as Component, params['id']);
            } else {
                this.workStationConfigPopupService
                    .open(WorkStationConfigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
