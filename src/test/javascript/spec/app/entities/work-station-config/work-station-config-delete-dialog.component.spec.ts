/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MMSTestModule } from '../../../test.module';
import { WorkStationConfigDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config-delete-dialog.component';
import { WorkStationConfigService } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config.service';

describe('Component Tests', () => {

    describe('WorkStationConfig Management Delete Component', () => {
        let comp: WorkStationConfigDeleteDialogComponent;
        let fixture: ComponentFixture<WorkStationConfigDeleteDialogComponent>;
        let service: WorkStationConfigService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [WorkStationConfigDeleteDialogComponent],
                providers: [
                    WorkStationConfigService
                ]
            })
            .overrideTemplate(WorkStationConfigDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkStationConfigDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkStationConfigService);
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
