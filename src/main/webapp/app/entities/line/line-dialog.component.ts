import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Line } from './line.model';
import { LinePopupService } from './line-popup.service';
import { LineService } from './line.service';

@Component({
    selector: 'jhi-line-dialog',
    templateUrl: './line-dialog.component.html'
})
export class LineDialogComponent implements OnInit {

    line: Line;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private lineService: LineService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.line.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lineService.update(this.line));
        } else {
            this.subscribeToSaveResponse(
                this.lineService.create(this.line));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Line>>) {
        result.subscribe((res: HttpResponse<Line>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Line) {
        this.eventManager.broadcast({ name: 'lineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-line-popup',
    template: ''
})
export class LinePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private linePopupService: LinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.linePopupService
                    .open(LineDialogComponent as Component, params['id']);
            } else {
                this.linePopupService
                    .open(LineDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
