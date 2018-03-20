import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WorkStationConfig } from './work-station-config.model';
import { WorkStationConfigPopupService } from './work-station-config-popup.service';
import { WorkStationConfigService } from './work-station-config.service';

@Component({
    selector: 'jhi-work-station-config-delete-dialog',
    templateUrl: './work-station-config-delete-dialog.component.html'
})
export class WorkStationConfigDeleteDialogComponent {

    workStationConfig: WorkStationConfig;

    constructor(
        private workStationConfigService: WorkStationConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workStationConfigService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'workStationConfigListModification',
                content: 'Deleted an workStationConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-work-station-config-delete-popup',
    template: ''
})
export class WorkStationConfigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workStationConfigPopupService: WorkStationConfigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.workStationConfigPopupService
                .open(WorkStationConfigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
