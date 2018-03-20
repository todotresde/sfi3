/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi3TestModule } from '../../../test.module';
import { TracerDialogComponent } from '../../../../../../main/webapp/app/entities/tracer/tracer-dialog.component';
import { TracerService } from '../../../../../../main/webapp/app/entities/tracer/tracer.service';
import { Tracer } from '../../../../../../main/webapp/app/entities/tracer/tracer.model';
import { WorkStationConfigService } from '../../../../../../main/webapp/app/entities/work-station-config';
import { ManufacturingOrderService } from '../../../../../../main/webapp/app/entities/manufacturing-order';
import { LineService } from '../../../../../../main/webapp/app/entities/line';
import { WorkStationService } from '../../../../../../main/webapp/app/entities/work-station';

describe('Component Tests', () => {

    describe('Tracer Management Dialog Component', () => {
        let comp: TracerDialogComponent;
        let fixture: ComponentFixture<TracerDialogComponent>;
        let service: TracerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [TracerDialogComponent],
                providers: [
                    WorkStationConfigService,
                    ManufacturingOrderService,
                    LineService,
                    WorkStationService,
                    TracerService
                ]
            })
            .overrideTemplate(TracerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TracerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TracerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Tracer(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tracer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tracerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Tracer();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tracer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tracerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
