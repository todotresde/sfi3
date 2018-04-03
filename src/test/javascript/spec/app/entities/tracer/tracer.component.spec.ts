/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MMSTestModule } from '../../../test.module';
import { TracerComponent } from '../../../../../../main/webapp/app/entities/tracer/tracer.component';
import { TracerService } from '../../../../../../main/webapp/app/entities/tracer/tracer.service';
import { Tracer } from '../../../../../../main/webapp/app/entities/tracer/tracer.model';

describe('Component Tests', () => {

    describe('Tracer Management Component', () => {
        let comp: TracerComponent;
        let fixture: ComponentFixture<TracerComponent>;
        let service: TracerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [TracerComponent],
                providers: [
                    TracerService
                ]
            })
            .overrideTemplate(TracerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TracerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TracerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Tracer(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tracers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
