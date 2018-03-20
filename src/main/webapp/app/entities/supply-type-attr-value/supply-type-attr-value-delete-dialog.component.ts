import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupplyTypeAttrValue } from './supply-type-attr-value.model';
import { SupplyTypeAttrValuePopupService } from './supply-type-attr-value-popup.service';
import { SupplyTypeAttrValueService } from './supply-type-attr-value.service';

@Component({
    selector: 'jhi-supply-type-attr-value-delete-dialog',
    templateUrl: './supply-type-attr-value-delete-dialog.component.html'
})
export class SupplyTypeAttrValueDeleteDialogComponent {

    supplyTypeAttrValue: SupplyTypeAttrValue;

    constructor(
        private supplyTypeAttrValueService: SupplyTypeAttrValueService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.supplyTypeAttrValueService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'supplyTypeAttrValueListModification',
                content: 'Deleted an supplyTypeAttrValue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-supply-type-attr-value-delete-popup',
    template: ''
})
export class SupplyTypeAttrValueDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private supplyTypeAttrValuePopupService: SupplyTypeAttrValuePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.supplyTypeAttrValuePopupService
                .open(SupplyTypeAttrValueDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
