/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi3TestModule } from '../../../test.module';
import { SupplyTypeAttrValueComponent } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value.component';
import { SupplyTypeAttrValueService } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value.service';
import { SupplyTypeAttrValue } from '../../../../../../main/webapp/app/entities/supply-type-attr-value/supply-type-attr-value.model';

describe('Component Tests', () => {

    describe('SupplyTypeAttrValue Management Component', () => {
        let comp: SupplyTypeAttrValueComponent;
        let fixture: ComponentFixture<SupplyTypeAttrValueComponent>;
        let service: SupplyTypeAttrValueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [SupplyTypeAttrValueComponent],
                providers: [
                    SupplyTypeAttrValueService
                ]
            })
            .overrideTemplate(SupplyTypeAttrValueComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeAttrValueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeAttrValueService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SupplyTypeAttrValue(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supplyTypeAttrValues[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
