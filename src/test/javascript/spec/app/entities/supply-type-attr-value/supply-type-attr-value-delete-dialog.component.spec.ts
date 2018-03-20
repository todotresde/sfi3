/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi3TestModule } from '../../../test.module';
import { SupplyTypeAttrValueDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value-delete-dialog.component';
import { SupplyTypeAttrValueService } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value.service';

describe('Component Tests', () => {

    describe('SupplyTypeAttrValue Management Delete Component', () => {
        let comp: SupplyTypeAttrValueDeleteDialogComponent;
        let fixture: ComponentFixture<SupplyTypeAttrValueDeleteDialogComponent>;
        let service: SupplyTypeAttrValueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [SupplyTypeAttrValueDeleteDialogComponent],
                providers: [
                    SupplyTypeAttrValueService
                ]
            })
            .overrideTemplate(SupplyTypeAttrValueDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeAttrValueDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeAttrValueService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
