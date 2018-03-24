import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SalleMySuffix } from './salle-my-suffix.model';
import { SalleMySuffixPopupService } from './salle-my-suffix-popup.service';
import { SalleMySuffixService } from './salle-my-suffix.service';
import { VilleMySuffix, VilleMySuffixService } from '../ville-my-suffix';

@Component({
    selector: 'jhi-salle-my-suffix-dialog',
    templateUrl: './salle-my-suffix-dialog.component.html'
})
export class SalleMySuffixDialogComponent implements OnInit {

    salle: SalleMySuffix;
    isSaving: boolean;

    villes: VilleMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private salleService: SalleMySuffixService,
        private villeService: VilleMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.villeService.query()
            .subscribe((res: HttpResponse<VilleMySuffix[]>) => { this.villes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.salle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salleService.update(this.salle));
        } else {
            this.subscribeToSaveResponse(
                this.salleService.create(this.salle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SalleMySuffix>>) {
        result.subscribe((res: HttpResponse<SalleMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SalleMySuffix) {
        this.eventManager.broadcast({ name: 'salleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVilleById(index: number, item: VilleMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-salle-my-suffix-popup',
    template: ''
})
export class SalleMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sallePopupService: SalleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sallePopupService
                    .open(SalleMySuffixDialogComponent as Component, params['id']);
            } else {
                this.sallePopupService
                    .open(SalleMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
