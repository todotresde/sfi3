/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MMSTestModule } from '../../../test.module';
import { WorkStationConfigDetailComponent } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config-detail.component';
import { WorkStationConfigService } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config.service';
import { WorkStationConfig } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config.model';

describe('Component Tests', () => {

    describe('WorkStationConfig Management Detail Component', () => {
        let comp: WorkStationConfigDetailComponent;
        let fixture: ComponentFixture<WorkStationConfigDetailComponent>;
        let service: WorkStationConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [WorkStationConfigDetailComponent],
                providers: [
                    WorkStationConfigService
                ]
            })
            .overrideTemplate(WorkStationConfigDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkStationConfigDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkStationConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new WorkStationConfig(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.workStationConfig).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
