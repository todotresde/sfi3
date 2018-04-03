/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MMSTestModule } from '../../../test.module';
import { SupplyComponent } from '../../../../../../main/webapp/app/entities/supply/supply.component';
import { SupplyService } from '../../../../../../main/webapp/app/entities/supply/supply.service';
import { Supply } from '../../../../../../main/webapp/app/entities/supply/supply.model';

describe('Component Tests', () => {

    describe('Supply Management Component', () => {
        let comp: SupplyComponent;
        let fixture: ComponentFixture<SupplyComponent>;
        let service: SupplyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MMSTestModule],
                declarations: [SupplyComponent],
                providers: [
                    SupplyService
                ]
            })
            .overrideTemplate(SupplyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SupplyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SupplyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Supply(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.supplies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
