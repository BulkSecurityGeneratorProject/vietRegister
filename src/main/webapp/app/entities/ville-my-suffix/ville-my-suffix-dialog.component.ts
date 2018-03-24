import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VilleMySuffix } from './ville-my-suffix.model';
import { VilleMySuffixPopupService } from './ville-my-suffix-popup.service';
import { VilleMySuffixService } from './ville-my-suffix.service';

@Component({
    selector: 'jhi-ville-my-suffix-dialog',
    templateUrl: './ville-my-suffix-dialog.component.html'
})
export class VilleMySuffixDialogComponent implements OnInit {

    ville: VilleMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private villeService: VilleMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ville.id !== undefined) {
            this.subscribeToSaveResponse(
                this.villeService.update(this.ville));
        } else {
            this.subscribeToSaveResponse(
                this.villeService.create(this.ville));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VilleMySuffix>>) {
        result.subscribe((res: HttpResponse<VilleMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VilleMySuffix) {
        this.eventManager.broadcast({ name: 'villeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ville-my-suffix-popup',
    template: ''
})
export class VilleMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private villePopupService: VilleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.villePopupService
                    .open(VilleMySuffixDialogComponent as Component, params['id']);
            } else {
                this.villePopupService
                    .open(VilleMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
