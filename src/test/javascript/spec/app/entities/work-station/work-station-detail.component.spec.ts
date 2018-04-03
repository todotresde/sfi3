/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MMSTestModule } from '../../../test.module';
import { WorkStationDetailComponent } from '../../../../../../main/webapp/app/entities/work-station/work-station-detail.component';
import { WorkStationService } from '../../../../../../main/webapp/app/entities/work-station/work-station.service';
import { WorkStation } from '../../../../../../main/webapp/app/entities/work-station/work-station.model';

describe('Component Tests', () => {

    describe('WorkStation Management Detail Component', () => {
        let comp: WorkStationDetailComponent;
        let fixture: ComponentFixture<WorkStationDetailComponent>;
        let service: WorkStationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [WorkStationDetailComponent],
                providers: [
                    WorkStationService
                ]
            })
            .overrideTemplate(WorkStationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkStationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkStationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new WorkStation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.workStation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
