/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VietRegisterTestModule } from '../../../test.module';
import { VilleMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/ville-my-suffix/ville-my-suffix-detail.component';
import { VilleMySuffixService } from '../../../../../../main/webapp/app/entities/ville-my-suffix/ville-my-suffix.service';
import { VilleMySuffix } from '../../../../../../main/webapp/app/entities/ville-my-suffix/ville-my-suffix.model';

describe('Component Tests', () => {

    describe('VilleMySuffix Management Detail Component', () => {
        let comp: VilleMySuffixDetailComponent;
        let fixture: ComponentFixture<VilleMySuffixDetailComponent>;
        let service: VilleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [VilleMySuffixDetailComponent],
                providers: [
                    VilleMySuffixService
                ]
            })
            .overrideTemplate(VilleMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VilleMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VilleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VilleMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ville).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
