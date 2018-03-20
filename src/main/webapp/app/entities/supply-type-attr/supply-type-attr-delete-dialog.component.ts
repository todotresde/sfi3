import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyTypeAttr } from './supply-type-attr.model';
import { SupplyTypeAttrPopupService } from './supply-type-attr-popup.service';
import { SupplyTypeAttrService } from './supply-type-attr.service';

@Component({
    selector: 'jhi-supply-type-attr-delete-dialog',
    templateUrl: './supply-type-attr-delete-dialog.component.html'
})
export class SupplyTypeAttrDeleteDialogComponent {

    supplyTypeAttr: SupplyTypeAttr;

    constructor(
        private supplyTypeAttrService: SupplyTypeAttrService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplyTypeAttrService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplyTypeAttrListModification',
                content: 'Deleted an supplyTypeAttr'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supply-type-attr-delete-popup',
    template: ''
})
export class SupplyTypeAttrDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyTypeAttrPopupService: SupplyTypeAttrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplyTypeAttrPopupService
                .open(SupplyTypeAttrDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
