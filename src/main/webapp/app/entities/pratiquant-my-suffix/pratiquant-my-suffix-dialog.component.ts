import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PratiquantMySuffix } from './pratiquant-my-suffix.model';
import { PratiquantMySuffixPopupService } from './pratiquant-my-suffix-popup.service';
import { PratiquantMySuffixService } from './pratiquant-my-suffix.service';
import { SalleMySuffix, SalleMySuffixService } from '../salle-my-suffix';

@Component({
    selector: 'jhi-pratiquant-my-suffix-dialog',
    templateUrl: './pratiquant-my-suffix-dialog.component.html'
})
export class PratiquantMySuffixDialogComponent implements OnInit {

    pratiquant: PratiquantMySuffix;
    isSaving: boolean;

    salles: SalleMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pratiquantService: PratiquantMySuffixService,
        private salleService: SalleMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.salleService.query()
            .subscribe((res: HttpResponse<SalleMySuffix[]>) => { this.salles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pratiquant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pratiquantService.update(this.pratiquant));
        } else {
            this.subscribeToSaveResponse(
                this.pratiquantService.create(this.pratiquant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PratiquantMySuffix>>) {
        result.subscribe((res: HttpResponse<PratiquantMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PratiquantMySuffix) {
        this.eventManager.broadcast({ name: 'pratiquantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSalleById(index: number, item: SalleMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pratiquant-my-suffix-popup',
    template: ''
})
export class PratiquantMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pratiquantPopupService: PratiquantMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pratiquantPopupService
                    .open(PratiquantMySuffixDialogComponent as Component, params['id']);
            } else {
                this.pratiquantPopupService
                    .open(PratiquantMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
