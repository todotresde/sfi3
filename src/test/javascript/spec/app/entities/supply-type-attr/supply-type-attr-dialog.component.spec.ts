/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi3TestModule } from '../../../test.module';
import { SupplyTypeAttrDialogComponent } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr-dialog.component';
import { SupplyTypeAttrService } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr.service';
import { SupplyTypeAttr } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr.model';
import { SupplyTypeService } from '../../../../../../main/webapp/app/entities/supply-type';

describe('Component Tests', () => {

    describe('SupplyTypeAttr Management Dialog Component', () => {
        let comp: SupplyTypeAttrDialogComponent;
        let fixture: ComponentFixture<SupplyTypeAttrDialogComponent>;
        let service: SupplyTypeAttrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [SupplyTypeAttrDialogComponent],
                providers: [
                    SupplyTypeService,
                    SupplyTypeAttrService
                ]
            })
            .overrideTemplate(SupplyTypeAttrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeAttrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeAttrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyTypeAttr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyTypeAttr = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyTypeAttrListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyTypeAttr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyTypeAttr = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyTypeAttrListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
