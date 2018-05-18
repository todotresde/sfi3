import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LinearRegression } from './linear-regression.model';
import { LinearRegressionPopupService } from './linear-regression-popup.service';
import { LinearRegressionService } from './linear-regression.service';

@Component({
    selector: 'jhi-linear-regression-learn-dialog',
    templateUrl: './linear-regression-learn-dialog.component.html'
})
export class LinearRegressionLearnDialogComponent {

    linearRegression: LinearRegression;

    constructor(
        private linearRegressionService: LinearRegressionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmLearn() {
        this.linearRegressionService.learn().subscribe((response) => {
            this.eventManager.broadcast({
                name: 'linearRegressionListModification',
                content: 'Learn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-linear-regression-learn-popup',
    template: ''
})
export class LinearRegressionLearnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private linearRegressionPopupService: LinearRegressionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.linearRegressionPopupService
                .open(LinearRegressionLearnDialogComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
