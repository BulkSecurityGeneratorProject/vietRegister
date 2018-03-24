/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VietRegisterTestModule } from '../../../test.module';
import { SalleMySuffixComponent } from '../../../../../../main/webapp/app/entities/salle-my-suffix/salle-my-suffix.component';
import { SalleMySuffixService } from '../../../../../../main/webapp/app/entities/salle-my-suffix/salle-my-suffix.service';
import { SalleMySuffix } from '../../../../../../main/webapp/app/entities/salle-my-suffix/salle-my-suffix.model';

describe('Component Tests', () => {

    describe('SalleMySuffix Management Component', () => {
        let comp: SalleMySuffixComponent;
        let fixture: ComponentFixture<SalleMySuffixComponent>;
        let service: SalleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [SalleMySuffixComponent],
                providers: [
                    SalleMySuffixService
                ]
            })
            .overrideTemplate(SalleMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalleMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SalleMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.salles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
