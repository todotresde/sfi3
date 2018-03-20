/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi3TestModule } from '../../../test.module';
import { WorkStationComponent } from '../../../../../../main/webapp/app/entities/work-station/work-station.component';
import { WorkStationService } from '../../../../../../main/webapp/app/entities/work-station/work-station.service';
import { WorkStation } from '../../../../../../main/webapp/app/entities/work-station/work-station.model';

describe('Component Tests', () => {

    describe('WorkStation Management Component', () => {
        let comp: WorkStationComponent;
        let fixture: ComponentFixture<WorkStationComponent>;
        let service: WorkStationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [WorkStationComponent],
                providers: [
                    WorkStationService
                ]
            })
            .overrideTemplate(WorkStationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WorkStationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkStationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new WorkStation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.workStations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
