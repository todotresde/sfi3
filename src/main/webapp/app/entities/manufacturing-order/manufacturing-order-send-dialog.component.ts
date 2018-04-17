import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderPopupService } from './manufacturing-order-popup.service';
import { ManufacturingOrderService } from './manufacturing-order.service';

@Component({
    selector: 'jhi-manufacturing-order-send-dialog',
    templateUrl: './manufacturing-order-send-dialog.component.html'
})
export class ManufacturingOrderSendDialogComponent {

    manufacturingOrder: ManufacturingOrder;

    constructor(
        private manufacturingOrderService: ManufacturingOrderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmSend(id: number) {
        this.manufacturingOrderService.send(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'manufacturingOrderListModification',
                content: 'Send an manufacturingOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-manufacturing-order-send-popup',
    template: ''
})
export class ManufacturingOrderSendPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private manufacturingOrderPopupService: ManufacturingOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.manufacturingOrderPopupService
                .open(ManufacturingOrderSendDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
