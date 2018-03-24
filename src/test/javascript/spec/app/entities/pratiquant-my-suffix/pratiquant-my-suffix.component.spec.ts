/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VietRegisterTestModule } from '../../../test.module';
import { PratiquantMySuffixComponent } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix.component';
import { PratiquantMySuffixService } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix.service';
import { PratiquantMySuffix } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix.model';

describe('Component Tests', () => {

    describe('PratiquantMySuffix Management Component', () => {
        let comp: PratiquantMySuffixComponent;
        let fixture: ComponentFixture<PratiquantMySuffixComponent>;
        let service: PratiquantMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [PratiquantMySuffixComponent],
                providers: [
                    PratiquantMySuffixService
                ]
            })
            .overrideTemplate(PratiquantMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PratiquantMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PratiquantMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PratiquantMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pratiquants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
