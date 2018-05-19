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
import { WorkStation, WorkStationService } from '../work-station';
import { SupplyType, SupplyTypeService } from '../supply-type';
import { Line, LineService } from '../line';
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
    workStations: WorkStation[];
    workStation: WorkStation;
    supplyTypes: SupplyType[];
    supplyType: SupplyType;
    lines: Line[];
    line: Line;
    filter: any;

    constructor(
        private employeeService: EmployeeService,
        private workStationService: WorkStationService,
        private supplyTypeService: SupplyTypeService,
        private lineService: LineService,
        private tracerService: TracerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute
    ) {
    }

    loadAll() {
        this.workStationService.query()
            .subscribe((res: HttpResponse<WorkStation[]>) => { this.workStations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyTypeService.query()
            .subscribe((res: HttpResponse<SupplyType[]>) => { this.supplyTypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.lineService.query()
            .subscribe((res: HttpResponse<Line[]>) => { this.lines = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

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

    setFilter(line: Line, workStation: WorkStation, supplyType: SupplyType) {
        if (workStation && supplyType) {
            this.prepareDataForChart();
        }
    }

    trackId(index: number, item: Employee) {
        return item.id;
    }

    trackWorkStationById(index: number, item: WorkStation) {
        return item.id;
    }

    trackSupplyTypeById(index: number, item: SupplyType) {
        return item.id;
    }

    trackLineById(index: number, item: Line) {
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
        let lastTracer: TracerTimeDTO;
        let measure = 1;
        this.tracerTimeDTOs.forEach((res) => {
            if ((this.workStation && this.workStation.id === res.workStationId) &&
                (this.supplyType && this.supplyType.id === res.supplyTypeId)) {
                if (!lastTracer) {
                    lastTracer = res;
                }
                if (lastTracer.tracerId !== res.tracerId) {
                    data.push({'x': measure, 'y': parseFloat((lastTracer.time / 60).toFixed(2)), 'data': lastTracer});
                    lastTracer = res;
                    measure = 1;
                }
                measure *= parseFloat(res.value);
                measure = parseFloat(measure.toFixed(2));
            }
        });

        this.loadChart(data);
    }

    private loadChart(data: any[]) {
        const linearRegressionDots = this.linearRegression(data);

        this.chartOptions = {
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Surface (m2)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Time (min)'
                }
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} m2, {point.y} min.'
                    }
                }
            },
            series: [{
                name: 'Linear Regression',
                type: 'line',
                data: linearRegressionDots
            }, {
                name: 'Production',
                type: 'scatter',
                data
            }]
        };
    }

    private linearRegression(data: any[]) {
        let n = 0;
        const x = [];
        const y = [];
        let max = 0;

        // first pass: read in data, compute xbar and ybar
        let sumx = 0.0, sumy = 0.0, sumx2 = 0.0;
        data.forEach((res) => {
            x[n] = res.x;
            y[n] = res.y;
            sumx  += x[n];
            sumx2 += x[n] * x[n];
            sumy  += y[n];
            if (x[n] > max) {
                max = x[n];
            }
            n++;
        });

        const xbar = sumx / n;
        const ybar = sumy / n;

        // second pass: compute summary statistics
        let xxbar = 0.0, yybar = 0.0, xybar = 0.0;
        for (let i = 0; i < n; i++) {
            xxbar += (x[i] - xbar) * (x[i] - xbar);
            yybar += (y[i] - ybar) * (y[i] - ybar);
            xybar += (x[i] - xbar) * (y[i] - ybar);
        }
        const beta1 = xybar / xxbar;
        const beta0 = ybar - beta1 * xbar;

        // print results
        // console.log('y   = ' + beta1 + ' * x + ' + beta0);
        // console.log('x: 3 y:' + (beta1 * 3 + beta0) );
        // console.log('x: ' + max + ' y:' + (beta1 * max + beta0));

        // analyze results
        const df = n - 2;
        let rss = 0.0;      // residual sum of squares
        let ssr = 0.0;      // regression sum of squares
        for (let i = 0; i < n; i++) {
            const fit = beta1 * x[i] + beta0;
            rss += (fit - y[i]) * (fit - y[i]);
            ssr += (fit - ybar) * (fit - ybar);
        }
        const R2    = ssr / yybar;
        const svar  = rss / df;
        const svar1 = svar / xxbar;
        let svar0 = svar / n + xbar * xbar * svar1;
        // console.log('R^2                 = ' + R2);
        // console.log('std error of beta_1 = ' + Math.sqrt(svar1));
        // console.log('std error of beta_0 = ' + Math.sqrt(svar0));
        svar0 = svar * sumx2 / (n * xxbar);
        // console.log('std error of beta_0 = ' + Math.sqrt(svar0));

        // console.log('SSTO = ' + yybar);
        // console.log('SSE  = ' + rss);
        // console.log('SSR  = ' + ssr);
        // console.log(beta0, beta1, 3, (beta1 * 3 + beta0), max, (beta1 * max + beta0));
        return[{
            x: 3, y: (beta1 * 3 + beta0)
        }, {
            x: max, y: (beta1 * max + beta0)
        }];
    }
}
