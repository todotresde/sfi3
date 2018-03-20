/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi3TestModule } from '../../../test.module';
import { SupplyTypeAttrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr-delete-dialog.component';
import { SupplyTypeAttrService } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr.service';

describe('Component Tests', () => {

    describe('SupplyTypeAttr Management Delete Component', () => {
        let comp: SupplyTypeAttrDeleteDialogComponent;
        let fixture: ComponentFixture<SupplyTypeAttrDeleteDialogComponent>;
        let service: SupplyTypeAttrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [SupplyTypeAttrDeleteDialogComponent],
                providers: [
                    SupplyTypeAttrService
                ]
            })
            .overrideTemplate(SupplyTypeAttrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeAttrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeAttrService);
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
