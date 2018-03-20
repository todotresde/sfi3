/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi3TestModule } from '../../../test.module';
import { SupplyTypeAttrValueDialogComponent } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value-dialog.component';
import { SupplyTypeAttrValueService } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value.service';
import { SupplyTypeAttrValue } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value.model';
import { ProductService } from '../../../../../../main/webapp/app/entities/product';
import { SupplyService } from '../../../../../../main/webapp/app/entities/supply';
import { SupplyTypeService } from '../../../../../../main/webapp/app/entities/supply-type';
import { SupplyTypeAttrService } from '../../../../../../main/webapp/app/entities/supply-type-attr';
import { ManufacturingOrderService } from '../../../../../../main/webapp/app/entities/manufacturing-order';

describe('Component Tests', () => {

    describe('SupplyTypeAttrValue Management Dialog Component', () => {
        let comp: SupplyTypeAttrValueDialogComponent;
        let fixture: ComponentFixture<SupplyTypeAttrValueDialogComponent>;
        let service: SupplyTypeAttrValueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [SupplyTypeAttrValueDialogComponent],
                providers: [
                    ProductService,
                    SupplyService,
                    SupplyTypeService,
                    SupplyTypeAttrService,
                    ManufacturingOrderService,
                    SupplyTypeAttrValueService
                ]
            })
            .overrideTemplate(SupplyTypeAttrValueDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeAttrValueDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeAttrValueService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyTypeAttrValue(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyTypeAttrValue = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyTypeAttrValueListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyTypeAttrValue();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyTypeAttrValue = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyTypeAttrValueListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
