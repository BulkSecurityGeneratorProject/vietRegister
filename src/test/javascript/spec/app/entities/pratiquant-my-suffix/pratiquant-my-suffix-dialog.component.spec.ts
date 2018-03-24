/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VietRegisterTestModule } from '../../../test.module';
import { PratiquantMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix-dialog.component';
import { PratiquantMySuffixService } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix.service';
import { PratiquantMySuffix } from '../../../../../../main/webapp/app/entities/pratiquant-my-suffix/pratiquant-my-suffix.model';
import { SalleMySuffixService } from '../../../../../../main/webapp/app/entities/salle-my-suffix';

describe('Component Tests', () => {

    describe('PratiquantMySuffix Management Dialog Component', () => {
        let comp: PratiquantMySuffixDialogComponent;
        let fixture: ComponentFixture<PratiquantMySuffixDialogComponent>;
        let service: PratiquantMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VietRegisterTestModule],
                declarations: [PratiquantMySuffixDialogComponent],
                providers: [
                    SalleMySuffixService,
                    PratiquantMySuffixService
                ]
            })
            .overrideTemplate(PratiquantMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PratiquantMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PratiquantMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PratiquantMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pratiquant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pratiquantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PratiquantMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pratiquant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pratiquantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
