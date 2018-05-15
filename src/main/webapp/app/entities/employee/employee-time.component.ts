import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { TracerTimeDTO } from '../tracer-time-dto/tracer-time-dto.model';
import { TracerService } from '../tracer/tracer.service';
import { Principal } from '../../shared';

import * as Highcharts from 'highcharts';

@Component({
    selector: 'jhi-employee-time',
    templateUrl: './employee-time.component.html'
})
export class EmployeeTimeComponent implements OnInit, OnDestroy {
    employeeId: string;
    eventSubscriber: Subscription;
    tracerTimeDTOs: TracerTimeDTO[];
    Highcharts = Highcharts;
    chartOptions: any;

    constructor(
        private employeeService: EmployeeService,
        private tracerService: TracerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute
    ) {
    }

    loadAll() {
        this.tracerService.queryTimeForEmployee(this.employeeId).subscribe(
            (res: HttpResponse<TracerTimeDTO[]>) => {
                this.tracerTimeDTOs = res.body;
                this.prepareDataForChart();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.employeeId = this.route.snapshot.paramMap.get('id');
        this.loadAll();
        this.principal.identity().then((account) => {
        });
        this.registerChangeInEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Employee) {
        return item.id;
    }
    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('employeeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private prepareDataForChart() {
        const data = [];
        this.tracerTimeDTOs.forEach((res) => {
            if (res.name === 'Width') {
                data.push([parseFloat(res.value), res.time / 60]);
            }
        });

        this.loadChart(data);
    }

    private loadChart(data: any[]) {
        this.chartOptions = {
            series: [{
                type: 'line',
                data: [1, 2, 3]
            }, {
                type: 'scatter',
                data: data
            }]
        };
    }
}
