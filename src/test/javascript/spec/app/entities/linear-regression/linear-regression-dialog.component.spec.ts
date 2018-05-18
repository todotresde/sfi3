/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MMSTestModule } from '../../../test.module';
import { LinearRegressionDialogComponent } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression-dialog.component';
import { LinearRegressionService } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression.service';
import { LinearRegression } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression.model';
import { LineService } from '../../../../../../main/webapp/app/entities/line';
import { WorkStationConfigService } from '../../../../../../main/webapp/app/entities/work-station-config';
import { WorkStationService } from '../../../../../../main/webapp/app/entities/work-station';
import { SupplyService } from '../../../../../../main/webapp/app/entities/supply';
import { SupplyTypeService } from '../../../../../../main/webapp/app/entities/supply-type';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee';

describe('Component Tests', () => {

    describe('LinearRegression Management Dialog Component', () => {
        let comp: LinearRegressionDialogComponent;
        let fixture: ComponentFixture<LinearRegressionDialogComponent>;
        let service: LinearRegressionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [LinearRegressionDialogComponent],
                providers: [
                    LineService,
                    WorkStationConfigService,
                    WorkStationService,
                    SupplyService,
                    SupplyTypeService,
                    EmployeeService,
                    LinearRegressionService
                ]
            })
            .overrideTemplate(LinearRegressionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LinearRegressionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LinearRegressionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LinearRegression(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.linearRegression = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'linearRegressionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LinearRegression();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.linearRegression = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'linearRegressionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
