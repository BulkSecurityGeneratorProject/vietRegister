/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VietRegisterTestModule } from '../../../test.module';
import { SalleMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/salle-my-suffix/salle-my-suffix-delete-dialog.component';
import { SalleMySuffixService } from '../../../../../../main/webapp/app/entities/salle-my-suffix/salle-my-suffix.service';

describe('Component Tests', () => {

    describe('SalleMySuffix Management Delete Component', () => {
        let comp: SalleMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SalleMySuffixDeleteDialogComponent>;
        let service: SalleMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [SalleMySuffixDeleteDialogComponent],
                providers: [
                    SalleMySuffixService
                ]
            })
            .overrideTemplate(SalleMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalleMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
