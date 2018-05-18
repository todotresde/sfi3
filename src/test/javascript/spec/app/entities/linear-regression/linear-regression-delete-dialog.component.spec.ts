/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MMSTestModule } from '../../../test.module';
import { LinearRegressionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression-delete-dialog.component';
import { LinearRegressionService } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression.service';

describe('Component Tests', () => {

    describe('LinearRegression Management Delete Component', () => {
        let comp: LinearRegressionDeleteDialogComponent;
        let fixture: ComponentFixture<LinearRegressionDeleteDialogComponent>;
        let service: LinearRegressionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [LinearRegressionDeleteDialogComponent],
                providers: [
                    LinearRegressionService
                ]
            })
            .overrideTemplate(LinearRegressionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LinearRegressionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LinearRegressionService);
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
