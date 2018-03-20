/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi3TestModule } from '../../../test.module';
import { SupplyTypeAttrComponent } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr.component';
import { SupplyTypeAttrService } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr.service';
import { SupplyTypeAttr } from '../../../../../../main/webapp/app/entities/supply-type-attr/supply-type-attr.model';

describe('Component Tests', () => {

    describe('SupplyTypeAttr Management Component', () => {
        let comp: SupplyTypeAttrComponent;
        let fixture: ComponentFixture<SupplyTypeAttrComponent>;
        let service: SupplyTypeAttrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [SupplyTypeAttrComponent],
                providers: [
                    SupplyTypeAttrService
                ]
            })
            .overrideTemplate(SupplyTypeAttrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeAttrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeAttrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SupplyTypeAttr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supplyTypeAttrs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
