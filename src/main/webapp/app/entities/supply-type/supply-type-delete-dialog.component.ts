import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyType } from './supply-type.model';
import { SupplyTypePopupService } from './supply-type-popup.service';
import { SupplyTypeService } from './supply-type.service';

@Component({
    selector: 'jhi-supply-type-delete-dialog',
    templateUrl: './supply-type-delete-dialog.component.html'
})
export class SupplyTypeDeleteDialogComponent {

    supplyType: SupplyType;

    constructor(
        private supplyTypeService: SupplyTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplyTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplyTypeListModification',
                content: 'Deleted an supplyType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supply-type-delete-popup',
    template: ''
})
export class SupplyTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyTypePopupService: SupplyTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplyTypePopupService
                .open(SupplyTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
