/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi3TestModule } from '../../../test.module';
import { WorkStationConfigComponent } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config.component';
import { WorkStationConfigService } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config.service';
import { WorkStationConfig } from '../../../../../../main/webapp/app/entities/work-station-config/work-station-config.model';

describe('Component Tests', () => {

    describe('WorkStationConfig Management Component', () => {
        let comp: WorkStationConfigComponent;
        let fixture: ComponentFixture<WorkStationConfigComponent>;
        let service: WorkStationConfigService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [WorkStationConfigComponent],
                providers: [
                    WorkStationConfigService
                ]
            })
            .overrideTemplate(WorkStationConfigComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkStationConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkStationConfigService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new WorkStationConfig(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.workStationConfigs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
