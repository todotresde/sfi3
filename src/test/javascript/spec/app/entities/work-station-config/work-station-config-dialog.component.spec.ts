/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi3TestModule } from '../../../test.module';
import { WorkStationConfigDialogComponent } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config-dialog.component';
import { WorkStationConfigService } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config.service';
import { WorkStationConfig } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config.model';
import { WorkStationService } from '../../../../../../main/webapp/app/entities/work-station';
import { SupplyTypeService } from '../../../../../../main/webapp/app/entities/supply-type';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee';
import { LineService } from '../../../../../../main/webapp/app/entities/line';

describe('Component Tests', () => {

    describe('WorkStationConfig Management Dialog Component', () => {
        let comp: WorkStationConfigDialogComponent;
        let fixture: ComponentFixture<WorkStationConfigDialogComponent>;
        let service: WorkStationConfigService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [WorkStationConfigDialogComponent],
                providers: [
                    WorkStationService,
                    SupplyTypeService,
                    EmployeeService,
                    LineService,
                    WorkStationConfigService
                ]
            })
            .overrideTemplate(WorkStationConfigDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkStationConfigDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkStationConfigService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WorkStationConfig(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.workStationConfig = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workStationConfigListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WorkStationConfig();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.workStationConfig = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'workStationConfigListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
