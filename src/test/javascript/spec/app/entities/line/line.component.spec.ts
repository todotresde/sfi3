/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi3TestModule } from '../../../test.module';
import { LineComponent } from '../../../../../../main/webapp/app/entities/line/line.component';
import { LineService } from '../../../../../../main/webapp/app/entities/line/line.service';
import { Line } from '../../../../../../main/webapp/app/entities/line/line.model';

describe('Component Tests', () => {

    describe('Line Management Component', () => {
        let comp: LineComponent;
        let fixture: ComponentFixture<LineComponent>;
        let service: LineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [LineComponent],
                providers: [
                    LineService
                ]
            })
            .overrideTemplate(LineComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Line(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lines[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
