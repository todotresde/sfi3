import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WorkStation } from './work-station.model';
import { WorkStationPopupService } from './work-station-popup.service';
import { WorkStationService } from './work-station.service';

@Component({
    selector: 'jhi-work-station-delete-dialog',
    templateUrl: './work-station-delete-dialog.component.html'
})
export class WorkStationDeleteDialogComponent {

    workStation: WorkStation;

    constructor(
        private workStationService: WorkStationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workStationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'workStationListModification',
                content: 'Deleted an workStation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-work-station-delete-popup',
    template: ''
})
export class WorkStationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workStationPopupService: WorkStationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.workStationPopupService
                .open(WorkStationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
