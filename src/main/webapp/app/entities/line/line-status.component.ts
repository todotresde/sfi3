import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';

import { ManufacturingOrder } from '../manufacturing-order/manufacturing-order.model';
import { ManufacturingOrderService } from '../manufacturing-order/manufacturing-order.service';
import { WorkStationConfig } from '../work-station-config/work-station-config.model';
import { WorkStationConfigService } from '../work-station-config/work-station-config.service';
import { Tracer } from '../tracer/tracer.model';
import { TracerService } from '../tracer/tracer.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-line-status',
    templateUrl: './line-status.component.html'
})
export class LineStatusComponent implements OnInit, OnDestroy {
    tracers: Tracer[];
    linesDTO: any = {};
    linesDTOArray: any = [];
    workStationsDTO: any = {};
    currentAccount: any;
    subscription: Subscription;
    eventSubscriber: Subscription;
    eventSubscribeReload: Subscription;
    manufacturingOrderId: string;
    manufacturingOrder: ManufacturingOrder;

    constructor(
        private tracerService: TracerService,
        private workStationConfigService: WorkStationConfigService,
        private manufacturingOrderService: ManufacturingOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.loadAll();
        this.eventSubscribeReload = Observable.interval(15000).subscribe((time) => this.loadAll());
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLines();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
        this.eventSubscribeReload.unsubscribe();
    }

    loadAllWorkStationConfigs() {
        this.workStationConfigService.queryTime().subscribe(
            (res: HttpResponse<WorkStationConfig[]>) => {
                this.sortWorkStations(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadAll() {
        this.subscription = this.route.params.subscribe((params) => {
            this.manufacturingOrderId = params['id'];
        });

        this.tracerService.queryOpen(this.manufacturingOrderId).subscribe(
            (res: HttpResponse<Tracer[]>) => {
                this.pushTracersIntoWorkStation(res.body);
                this.loadAllWorkStationConfigs();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadTracersForWorkStation(workStationId: number) {
        this.tracers = this.workStationsDTO[workStationId];
    }

    delayTimeForWorkStationConfig(workStationConfig: any) {
        const now = new Date();
        const maxTime = 9999999999;
        let minTime = maxTime;
        const tracers = this.workStationsDTO[workStationConfig.workStation.id];

        if (tracers) {
            tracers.forEach(function(tracer){
                // The tracer is in progress
                if (tracer.startTime) {
                    const startTime = new Date(tracer.startTime);
                    const delay = now.getTime() - startTime.getTime();
                    if (delay < minTime) {
                        minTime = delay;
                    }
                }
            });
            minTime = minTime / 1000;
            // There is a tracer in progress with more time than expected
            if (minTime > workStationConfig.averageTime && minTime !== maxTime / 1000) {
                return 'bg-danger' ;
            }
            // There is no tracer in progress, but yes in queue
            if (minTime > workStationConfig.averageTime && minTime === maxTime / 1000) {
                return 'bg-warning';
            }
            // Ther is a tracer in progress in time
            return 'bg-success';
        }
        return '';
    }

    trackWorkStationConfigId(index: number, item: WorkStationConfig) {
        return item.id;
    }

    registerChangeInLines() {
        this.eventSubscriber = this.eventManager.subscribe('lineListModification', (response) => this.loadAll());
    }

    ceil(num: number) {
        return Math.ceil(num);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private pushTracersIntoWorkStation(tracers: Tracer[]) {
        this.workStationsDTO = {};
        tracers.forEach((tracer: Tracer) => {
            if (!this.workStationsDTO[tracer.workStation.id]) {
                this.workStationsDTO[tracer.workStation.id] = [];
            }
           this.workStationsDTO[tracer.workStation.id].push(tracer);
        });
    }

    private sortWorkStations(workStationConfigs: WorkStationConfig[]) {
        this.linesDTO = {};
        this.linesDTOArray = [];

        workStationConfigs.forEach((workStationConfig: WorkStationConfig) => {
            if (!this.linesDTO[workStationConfig.line.id]) {
                this.linesDTO[workStationConfig.line.id] = workStationConfig.line;
            }

            if (!this.linesDTO[workStationConfig.line.id].workStationConfigs) {
                this.linesDTO[workStationConfig.line.id].workStationConfigs = [];
            }

            if (!this.linesDTO[workStationConfig.line.id].workStationConfigs[workStationConfig.row]) {
                this.linesDTO[workStationConfig.line.id].workStationConfigs[workStationConfig.row] = [];
            }

            this.linesDTO[workStationConfig.line.id].workStationConfigs[workStationConfig.row][workStationConfig.col] = workStationConfig;
        });
        for (const lineId of Object.keys(this.linesDTO)) {
            this.linesDTOArray.push(this.linesDTO[lineId]);
        }
    }
}
