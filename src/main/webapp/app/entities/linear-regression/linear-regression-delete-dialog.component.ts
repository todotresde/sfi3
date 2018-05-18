import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LinearRegression } from './linear-regression.model';
import { LinearRegressionPopupService } from './linear-regression-popup.service';
import { LinearRegressionService } from './linear-regression.service';

@Component({
    selector: 'jhi-linear-regression-delete-dialog',
    templateUrl: './linear-regression-delete-dialog.component.html'
})
export class LinearRegressionDeleteDialogComponent {

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

    confirmDelete(id: number) {
        this.linearRegressionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'linearRegressionListModification',
                content: 'Deleted an linearRegression'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-linear-regression-delete-popup',
    template: ''
})
export class LinearRegressionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private linearRegressionPopupService: LinearRegressionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.linearRegressionPopupService
                .open(LinearRegressionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
