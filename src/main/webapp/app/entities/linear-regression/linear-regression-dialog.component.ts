import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LinearRegression } from './linear-regression.model';
import { LinearRegressionPopupService } from './linear-regression-popup.service';
import { LinearRegressionService } from './linear-regression.service';
import { Line, LineService } from '../line';
import { WorkStationConfig, WorkStationConfigService } from '../work-station-config';
import { WorkStation, WorkStationService } from '../work-station';
import { Supply, SupplyService } from '../supply';
import { SupplyType, SupplyTypeService } from '../supply-type';
import { Employee, EmployeeService } from '../employee';

@Component({
    selector: 'jhi-linear-regression-dialog',
    templateUrl: './linear-regression-dialog.component.html'
})
export class LinearRegressionDialogComponent implements OnInit {

    linearRegression: LinearRegression;
    isSaving: boolean;

    lines: Line[];

    workstationconfigs: WorkStationConfig[];

    workstations: WorkStation[];

    supplies: Supply[];

    supplytypes: SupplyType[];

    employees: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private linearRegressionService: LinearRegressionService,
        private lineService: LineService,
        private workStationConfigService: WorkStationConfigService,
        private workStationService: WorkStationService,
        private supplyService: SupplyService,
        private supplyTypeService: SupplyTypeService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lineService.query()
            .subscribe((res: HttpResponse<Line[]>) => { this.lines = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.workStationConfigService.query()
            .subscribe((res: HttpResponse<WorkStationConfig[]>) => { this.workstationconfigs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.workStationService.query()
            .subscribe((res: HttpResponse<WorkStation[]>) => { this.workstations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyService.query()
            .subscribe((res: HttpResponse<Supply[]>) => { this.supplies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyTypeService.query()
            .subscribe((res: HttpResponse<SupplyType[]>) => { this.supplytypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.employeeService.query()
            .subscribe((res: HttpResponse<Employee[]>) => { this.employees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.linearRegression.id !== undefined) {
            this.subscribeToSaveResponse(
                this.linearRegressionService.update(this.linearRegression));
        } else {
            this.subscribeToSaveResponse(
                this.linearRegressionService.create(this.linearRegression));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LinearRegression>>) {
        result.subscribe((res: HttpResponse<LinearRegression>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LinearRegression) {
        this.eventManager.broadcast({ name: 'linearRegressionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLineById(index: number, item: Line) {
        return item.id;
    }

    trackWorkStationConfigById(index: number, item: WorkStationConfig) {
        return item.id;
    }

    trackWorkStationById(index: number, item: WorkStation) {
        return item.id;
    }

    trackSupplyById(index: number, item: Supply) {
        return item.id;
    }

    trackSupplyTypeById(index: number, item: SupplyType) {
        return item.id;
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-linear-regression-popup',
    template: ''
})
export class LinearRegressionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private linearRegressionPopupService: LinearRegressionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.linearRegressionPopupService
                    .open(LinearRegressionDialogComponent as Component, params['id']);
            } else {
                this.linearRegressionPopupService
                    .open(LinearRegressionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
