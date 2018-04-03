/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MMSTestModule } from '../../../test.module';
import { SupplyTypeDialogComponent } from '../../../../../../main/webapp/app/entities/supply-type/supply-type-dialog.component';
import { SupplyTypeService } from '../../../../../../main/webapp/app/entities/supply-type/supply-type.service';
import { SupplyType } from '../../../../../../main/webapp/app/entities/supply-type/supply-type.model';
import { SupplyTypeAttrService } from '../../../../../../main/webapp/app/entities/supply-type-attr';
import { WorkStationConfigService } from '../../../../../../main/webapp/app/entities/work-station-config';

describe('Component Tests', () => {

    describe('SupplyType Management Dialog Component', () => {
        let comp: SupplyTypeDialogComponent;
        let fixture: ComponentFixture<SupplyTypeDialogComponent>;
        let service: SupplyTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [SupplyTypeDialogComponent],
                providers: [
                    SupplyTypeAttrService,
                    WorkStationConfigService,
                    SupplyTypeService
                ]
            })
            .overrideTemplate(SupplyTypeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyType(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SupplyType();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.supplyType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'supplyTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
