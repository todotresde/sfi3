/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MMSTestModule } from '../../../test.module';
import { SupplyTypeAttrValueDetailComponent } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value-detail.component';
import { SupplyTypeAttrValueService } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value.service';
import { SupplyTypeAttrValue } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value.model';

describe('Component Tests', () => {

    describe('SupplyTypeAttrValue Management Detail Component', () => {
        let comp: SupplyTypeAttrValueDetailComponent;
        let fixture: ComponentFixture<SupplyTypeAttrValueDetailComponent>;
        let service: SupplyTypeAttrValueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [SupplyTypeAttrValueDetailComponent],
                providers: [
                    SupplyTypeAttrValueService
                ]
            })
            .overrideTemplate(SupplyTypeAttrValueDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeAttrValueDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeAttrValueService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SupplyTypeAttrValue(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supplyTypeAttrValue).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
