/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Sfi3TestModule } from '../../../test.module';
import { LineDetailComponent } from '../../../../../../main/webapp/app/entities/line/line-detail.component';
import { LineService } from '../../../../../../main/webapp/app/entities/line/line.service';
import { Line } from '../../../../../../main/webapp/app/entities/line/line.model';

describe('Component Tests', () => {

    describe('Line Management Detail Component', () => {
        let comp: LineDetailComponent;
        let fixture: ComponentFixture<LineDetailComponent>;
        let service: LineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [LineDetailComponent],
                providers: [
                    LineService
                ]
            })
            .overrideTemplate(LineDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Line(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.line).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
