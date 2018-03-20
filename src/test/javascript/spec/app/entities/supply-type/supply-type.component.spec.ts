/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi3TestModule } from '../../../test.module';
import { SupplyTypeComponent } from '../../../../../../main/webapp/app/entities/supply-type/supply-type.component';
import { SupplyTypeService } from '../../../../../../main/webapp/app/entities/supply-type/supply-type.service';
import { SupplyType } from '../../../../../../main/webapp/app/entities/supply-type/supply-type.model';

describe('Component Tests', () => {

    describe('SupplyType Management Component', () => {
        let comp: SupplyTypeComponent;
        let fixture: ComponentFixture<SupplyTypeComponent>;
        let service: SupplyTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi3TestModule],
                declarations: [SupplyTypeComponent],
                providers: [
                    SupplyTypeService
                ]
            })
            .overrideTemplate(SupplyTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SupplyType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supplyTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
