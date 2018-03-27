import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Line } from './line.model';
import { SubLine } from '../sub-line/sub-line.model';
import { WorkStation } from '../work-station/work-station.model';
import { WorkStationConfig } from '../work-station-config/work-station-config.model';
import { WorkStationConfigService } from '../work-station-config/work-station-config.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-line-status',
    templateUrl: './line-status.component.html'
})
export class LineStatusComponent implements OnInit, OnDestroy {
    linesDTO: any = {};
    linesDTOArray: any = [];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private workStationConfigService: WorkStationConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.workStationConfigService.query().subscribe(
            (res: HttpResponse<WorkStationConfig[]>) => {
                this.sortWorkStations(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackWorkStationConfigId(index: number, item: WorkStationConfig) {
        return item.id;
    }

    registerChangeInLines() {
        this.eventSubscriber = this.eventManager.subscribe('lineListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private sortWorkStations(workStationConfigs: WorkStationConfig[]) {
        workStationConfigs.forEach((workStationConfig: WorkStationConfig) => {
            if(!this.linesDTO[workStationConfig.line.id]){
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
        console.log(this.linesDTOArray);
    }
}
