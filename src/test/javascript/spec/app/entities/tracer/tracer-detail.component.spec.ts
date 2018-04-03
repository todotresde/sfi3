/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MMSTestModule } from '../../../test.module';
import { TracerDetailComponent } from '../../../../../../main/webapp/app/entities/tracer/tracer-detail.component';
import { TracerService } from '../../../../../../main/webapp/app/entities/tracer/tracer.service';
import { Tracer } from '../../../../../../main/webapp/app/entities/tracer/tracer.model';

describe('Component Tests', () => {

    describe('Tracer Management Detail Component', () => {
        let comp: TracerDetailComponent;
        let fixture: ComponentFixture<TracerDetailComponent>;
        let service: TracerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [TracerDetailComponent],
                providers: [
                    TracerService
                ]
            })
            .overrideTemplate(TracerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TracerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TracerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Tracer(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tracer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
