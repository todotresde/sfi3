import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Tracer } from './../tracer/tracer.model';
import { SupplyTypeAttrValue } from './../supply-type-attr-value/supply-type-attr-value.model';
import { LinearRegression } from './linear-regression.model';
import { LinearRegressionService } from './linear-regression.service';

import * as Highcharts from 'highcharts';

@Component({
    selector: 'jhi-linear-regression-chart',
    templateUrl: './linear-regression-chart.component.html'
})
export class LinearRegressionChartComponent implements OnInit, OnDestroy {
    Highcharts = Highcharts;
    chartOptions: any;
    linearRegressions: LinearRegression[];
    tracers: Tracer[];
    maxsMins: any = {};
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private linearRegressionService: LinearRegressionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['lineId'], params['workStationConfigId'], params['workStationId'], params['employeeId']);
        });
        this.registerChangeInLinearRegressions();
    }

    load(lineId, workStationConfigId, workStationId, employeeId) {
        this.linearRegressionService.findByGroup(lineId, workStationConfigId, workStationId, employeeId)
            .subscribe((linearRegressionResponse: HttpResponse<LinearRegression[]>) => {
                this.linearRegressions = linearRegressionResponse.body;

                this.linearRegressionService.getTracers(lineId, workStationConfigId, workStationId, employeeId)
                    .subscribe((tracersResponse: HttpResponse<Tracer[]>) => {
                        this.tracers = tracersResponse.body;
                        this.prepareDataForChart();
                    });
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLinearRegressions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'linearRegressionListModification',
            (response) => this.load(1, 1, 1, 1)
        );
    }

    private prepareDataForChart() {
        const data = {};
        const tracersByLinearRegression = {};

        this.tracers.forEach((res) => {
            if (!tracersByLinearRegression[res.linearRegression.id]) {
                tracersByLinearRegression[res.linearRegression.id] = [];
            }
            tracersByLinearRegression[res.linearRegression.id].push(res);
        });

        for (const tracerByLinearRegression of Object.keys(tracersByLinearRegression)) {
            let max = 0;
            let min = 10000; 
               
            tracersByLinearRegression[tracerByLinearRegression].forEach((res) => {
                let measure = 1;
                res.supplyTypeAttrValues.forEach((supplyTypeAttrValue: SupplyTypeAttrValue) => {
                    measure *= parseFloat(supplyTypeAttrValue.value);
                    measure = parseFloat(measure.toFixed(2));
                });

                if (measure > max) {
                    max = measure;
                }
                if (measure < min) {
                    min = measure;
                }

                if (!data[res.linearRegression.id]) {
                    data[res.linearRegression.id] = [];
                }
                data[res.linearRegression.id].push({'x': measure, 'y': parseFloat((res.time / 60).toFixed(2)), 'data': res});
            });

            if (!this.maxsMins[tracerByLinearRegression]) {
                this.maxsMins[tracerByLinearRegression] = {min, max};
            }
        }

        this.loadChart(data);
    }

    private loadChart(data: any) {
        const series: any[] = [];
        const colors: String[] = ['#00FF00', '#FF0000', '#0000FF'];

        this.linearRegressions.forEach((linearRegression, index) => {
            if (this.maxsMins[linearRegression.id]) {
                const linearRegressionDots = [{
                    x: this.maxsMins[linearRegression.id].min, y: (linearRegression.beta1 * this.maxsMins[linearRegression.id].min + linearRegression.beta0)
                }, {
                    x: this.maxsMins[linearRegression.id].max, y: (linearRegression.beta1 * this.maxsMins[linearRegression.id].max + linearRegression.beta0)
                }];

                series.push({
                    name: 'Linear Regression ' + linearRegression.id,
                    type: 'line',
                    data: linearRegressionDots,
                    color: colors[index]
                });

                series.push({
                    name: 'Production ' + linearRegression.id,
                    type: 'scatter',
                    data: data[linearRegression.id],
                    color: colors[index]
                });
            }
        });

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
            series
        };
    }

}
