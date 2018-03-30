import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tracer } from './tracer.model';
import { TracerPopupService } from './tracer-popup.service';
import { TracerService } from './tracer.service';
import { Product, ProductService } from '../product';
import { Supply } from '../supply/supply.model';
import { WorkStation, WorkStationService } from '../work-station';

@Component({
    selector: 'jhi-tracer-start',
    templateUrl: './tracer-start.component.html'
})
export class TracerStartComponent implements OnInit {

    tracer: Tracer;
    supply: Supply;
    isSending: boolean;

    workstations: WorkStation[];

    tracers: Tracer[];

    constructor(
        private datePipe: DatePipe,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private tracerService: TracerService,
        private productService: ProductService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isSending = false;
        this.tracer.startTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');

        this.findProduct(this.tracer.product);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    send() {
        this.isSending = true;
        console.log(this.tracer);
        this.tracer.endTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
        this.subscribeToSendResponse(
                this.tracerService.send(this.tracer));
    }

    private findProduct(product: Product) {
        this.productService.find(product.id)
            .subscribe((productResponse: HttpResponse<Product>) => {
                this.tracer.product = productResponse.body;
            });
    }

    private subscribeToSendResponse(result: Observable<Tracer>) {
        result.subscribe((res: Tracer) =>
            this.onSendSuccess(res), (res: Response) => this.onSendError(res));
    }

    private onSendSuccess(result: Tracer) {
        this.eventManager.broadcast({ name: 'tracerListModification', content: 'OK'});
        this.isSending = false;
        this.activeModal.dismiss(result);
    }

    private onSendError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSending = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-tracer-popup',
    template: ''
})
export class TracerStartPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tracerPopupService: TracerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tracerPopupService
                    .open(TracerStartComponent as Component, params['id']);
            } else {
                this.tracerPopupService
                    .open(TracerStartComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
