/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VietRegisterTestModule } from '../../../test.module';
import { PratiquantMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix-detail.component';
import { PratiquantMySuffixService } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix.service';
import { PratiquantMySuffix } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix.model';

describe('Component Tests', () => {

    describe('PratiquantMySuffix Management Detail Component', () => {
        let comp: PratiquantMySuffixDetailComponent;
        let fixture: ComponentFixture<PratiquantMySuffixDetailComponent>;
        let service: PratiquantMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [PratiquantMySuffixDetailComponent],
                providers: [
                    PratiquantMySuffixService
                ]
            })
            .overrideTemplate(PratiquantMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PratiquantMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PratiquantMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PratiquantMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pratiquant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
