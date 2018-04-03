/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MMSTestModule } from '../../../test.module';
import { SupplyTypeAttrDetailComponent } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr-detail.component';
import { SupplyTypeAttrService } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr.service';
import { SupplyTypeAttr } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr.model';

describe('Component Tests', () => {

    describe('SupplyTypeAttr Management Detail Component', () => {
        let comp: SupplyTypeAttrDetailComponent;
        let fixture: ComponentFixture<SupplyTypeAttrDetailComponent>;
        let service: SupplyTypeAttrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [SupplyTypeAttrDetailComponent],
                providers: [
                    SupplyTypeAttrService
                ]
            })
            .overrideTemplate(SupplyTypeAttrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeAttrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeAttrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SupplyTypeAttr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.supplyTypeAttr).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
