/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MMSTestModule } from '../../../test.module';
import { LinearRegressionComponent } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression.component';
import { LinearRegressionService } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression.service';
import { LinearRegression } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression.model';

describe('Component Tests', () => {

    describe('LinearRegression Management Component', () => {
        let comp: LinearRegressionComponent;
        let fixture: ComponentFixture<LinearRegressionComponent>;
        let service: LinearRegressionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [LinearRegressionComponent],
                providers: [
                    LinearRegressionService
                ]
            })
            .overrideTemplate(LinearRegressionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LinearRegressionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LinearRegressionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LinearRegression(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.linearRegressions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
