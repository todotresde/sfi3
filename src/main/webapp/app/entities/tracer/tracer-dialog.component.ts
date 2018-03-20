import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tracer } from './tracer.model';
import { TracerPopupService } from './tracer-popup.service';
import { TracerService } from './tracer.service';
import { WorkStationConfig, WorkStationConfigService } from '../work-station-config';
import { ManufacturingOrder, ManufacturingOrderService } from '../manufacturing-order';
import { Line, LineService } from '../line';
import { WorkStation, WorkStationService } from '../work-station';

@Component({
    selector: 'jhi-tracer-dialog',
    templateUrl: './tracer-dialog.component.html'
})
export class TracerDialogComponent implements OnInit {

    tracer: Tracer;
    isSaving: boolean;

    workstationconfigs: WorkStationConfig[];

    manufacturingorders: ManufacturingOrder[];

    lines: Line[];

    workstations: WorkStation[];

    tracers: Tracer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tracerService: TracerService,
        private workStationConfigService: WorkStationConfigService,
        private manufacturingOrderService: ManufacturingOrderService,
        private lineService: LineService,
        private workStationService: WorkStationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.workStationConfigService.query()
            .subscribe((res: HttpResponse<WorkStationConfig[]>) => { this.workstationconfigs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.manufacturingOrderService.query()
            .subscribe((res: HttpResponse<ManufacturingOrder[]>) => { this.manufacturingorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.lineService.query()
            .subscribe((res: HttpResponse<Line[]>) => { this.lines = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.workStationService.query()
            .subscribe((res: HttpResponse<WorkStation[]>) => { this.workstations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tracerService.query()
            .subscribe((res: HttpResponse<Tracer[]>) => { this.tracers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tracer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tracerService.update(this.tracer));
        } else {
            this.subscribeToSaveResponse(
                this.tracerService.create(this.tracer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Tracer>>) {
        result.subscribe((res: HttpResponse<Tracer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Tracer) {
        this.eventManager.broadcast({ name: 'tracerListModification', content: 'OK'});
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

    trackManufacturingOrderById(index: number, item: ManufacturingOrder) {
        return item.id;
    }

    trackLineById(index: number, item: Line) {
        return item.id;
    }

    trackWorkStationById(index: number, item: WorkStation) {
        return item.id;
    }

    trackTracerById(index: number, item: Tracer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tracer-popup',
    template: ''
})
export class TracerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tracerPopupService: TracerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tracerPopupService
                    .open(TracerDialogComponent as Component, params['id']);
            } else {
                this.tracerPopupService
                    .open(TracerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
