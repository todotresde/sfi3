/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MMSTestModule } from '../../../test.module';
import { LinearRegressionDetailComponent } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression-detail.component';
import { LinearRegressionService } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression.service';
import { LinearRegression } from '../../../../../../main/webapp/app/entities/linear-regression/linear-regression.model';

describe('Component Tests', () => {

    describe('LinearRegression Management Detail Component', () => {
        let comp: LinearRegressionDetailComponent;
        let fixture: ComponentFixture<LinearRegressionDetailComponent>;
        let service: LinearRegressionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [LinearRegressionDetailComponent],
                providers: [
                    LinearRegressionService
                ]
            })
            .overrideTemplate(LinearRegressionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LinearRegressionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LinearRegressionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LinearRegression(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.linearRegression).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
