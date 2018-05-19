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
    linearRegression: LinearRegression;
    tracers: Tracer[];
    max = 0;
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
            this.load(params['id']);
        });
        this.registerChangeInLinearRegressions();
    }

    load(id) {
        this.linearRegressionService.find(id)
            .subscribe((linearRegressionResponse: HttpResponse<LinearRegression>) => {
                this.linearRegression = linearRegressionResponse.body;
            });
        this.linearRegressionService.getTracers(id)
            .subscribe((tracersResponse: HttpResponse<Tracer[]>) => {
                this.tracers = tracersResponse.body;
                this.prepareDataForChart();
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
            (response) => this.load(this.linearRegression.id)
        );
    }

    private prepareDataForChart() {
        const data = [];
        this.tracers.forEach((res) => {
            let measure = 1;
            res.supplyTypeAttrValues.forEach((supplyTypeAttrValue: SupplyTypeAttrValue) => {
                measure *= parseFloat(supplyTypeAttrValue.value);
                measure = parseFloat(measure.toFixed(2));
                if (measure > this.max) {
                    this.max = measure;
                }
            });
            data.push({'x': measure, 'y': parseFloat((res.time / 60).toFixed(2)), 'data': res});
        });
        this.loadChart(data);
    }

    private loadChart(data: any[]) {
        const linearRegressionDots = [{
            x: 3, y: (this.linearRegression.beta1 * 3 + this.linearRegression.beta0)
        }, {
            x: this.max, y: (this.linearRegression.beta1 * this.max + this.linearRegression.beta0)
        }];
        console.log(this.max);

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

}
