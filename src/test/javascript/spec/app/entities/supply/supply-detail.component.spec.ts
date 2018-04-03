/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MMSTestModule } from '../../../test.module';
import { SupplyDetailComponent } from '../../../../../../main/webapp/app/entities/supply/supply-detail.component';
import { SupplyService } from '../../../../../../main/webapp/app/entities/supply/supply.service';
import { Supply } from '../../../../../../main/webapp/app/entities/supply/supply.model';

describe('Component Tests', () => {

    describe('Supply Management Detail Component', () => {
        let comp: SupplyDetailComponent;
        let fixture: ComponentFixture<SupplyDetailComponent>;
        let service: SupplyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [SupplyDetailComponent],
                providers: [
                    SupplyService
                ]
            })
            .overrideTemplate(SupplyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Supply(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supply).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
