/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VietRegisterTestModule } from '../../../test.module';
import { PratiquantMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix-delete-dialog.component';
import { PratiquantMySuffixService } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix.service';

describe('Component Tests', () => {

    describe('PratiquantMySuffix Management Delete Component', () => {
        let comp: PratiquantMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PratiquantMySuffixDeleteDialogComponent>;
        let service: PratiquantMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [PratiquantMySuffixDeleteDialogComponent],
                providers: [
                    PratiquantMySuffixService
                ]
            })
            .overrideTemplate(PratiquantMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PratiquantMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PratiquantMySuffixService);
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
