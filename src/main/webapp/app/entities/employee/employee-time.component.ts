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
        let lastTracer: TracerTimeDTO;
        let measure = 1;
        this.tracerTimeDTOs.forEach((res) => {
            if (!lastTracer) {
                lastTracer = res;
            }
            if (lastTracer.tracerId !== res.tracerId) {
                data.push([measure, parseFloat((lastTracer.time / 60).toFixed(2))]);
                lastTracer = res;
                measure = 1;
            }
            measure *= parseFloat(parseFloat(res.value).toFixed(2));
        });

        this.loadChart(data);
    }

    private loadChart(data: any[]) {
        const dots = this.linearRegression(data);

        this.chartOptions = {
            series: [{
                type: 'line',
                data: dots
            }, {
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
            x[n] = res[0];
            y[n] = res[1];
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
        console.log('y   = ' + beta1 + ' * x + ' + beta0);
        console.log('x: 3 y:' + (beta1 * 3 + beta0) );
        console.log('x: ' + max + ' y:' + (beta1 * max + beta0));

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
        console.log('R^2                 = ' + R2);
        console.log('std error of beta_1 = ' + Math.sqrt(svar1));
        console.log('std error of beta_0 = ' + Math.sqrt(svar0));
        svar0 = svar * sumx2 / (n * xxbar);
        console.log('std error of beta_0 = ' + Math.sqrt(svar0));

        console.log('SSTO = ' + yybar);
        console.log('SSE  = ' + rss);
        console.log('SSR  = ' + ssr);

        return[{
            x: 3, y: (beta1 * 3 + beta0)
        }, {
            x: max, y: (beta1 * max + beta0)
        }];
    }
}
