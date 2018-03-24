/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VietRegisterTestModule } from '../../../test.module';
import { SalleMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/salle-my-suffix/salle-my-suffix-detail.component';
import { SalleMySuffixService } from '../../../../../../main/webapp/app/entities/salle-my-suffix/salle-my-suffix.service';
import { SalleMySuffix } from '../../../../../../main/webapp/app/entities/salle-my-suffix/salle-my-suffix.model';

describe('Component Tests', () => {

    describe('SalleMySuffix Management Detail Component', () => {
        let comp: SalleMySuffixDetailComponent;
        let fixture: ComponentFixture<SalleMySuffixDetailComponent>;
        let service: SalleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [SalleMySuffixDetailComponent],
                providers: [
                    SalleMySuffixService
                ]
            })
            .overrideTemplate(SalleMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalleMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SalleMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.salle).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
