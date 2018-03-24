/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VietRegisterTestModule } from '../../../test.module';
import { VilleMySuffixComponent } from '../../../../../../main/webapp/app/entities/ville-my-suffix/ville-my-suffix.component';
import { VilleMySuffixService } from '../../../../../../main/webapp/app/entities/ville-my-suffix/ville-my-suffix.service';
import { VilleMySuffix } from '../../../../../../main/webapp/app/entities/ville-my-suffix/ville-my-suffix.model';

describe('Component Tests', () => {

    describe('VilleMySuffix Management Component', () => {
        let comp: VilleMySuffixComponent;
        let fixture: ComponentFixture<VilleMySuffixComponent>;
        let service: VilleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [VilleMySuffixComponent],
                providers: [
                    VilleMySuffixService
                ]
            })
            .overrideTemplate(VilleMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VilleMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VilleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VilleMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.villes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
