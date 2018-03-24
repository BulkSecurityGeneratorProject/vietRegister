import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SalleMySuffix } from './salle-my-suffix.model';
import { SalleMySuffixPopupService } from './salle-my-suffix-popup.service';
import { SalleMySuffixService } from './salle-my-suffix.service';

@Component({
    selector: 'jhi-salle-my-suffix-delete-dialog',
    templateUrl: './salle-my-suffix-delete-dialog.component.html'
})
export class SalleMySuffixDeleteDialogComponent {

    salle: SalleMySuffix;

    constructor(
        private salleService: SalleMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'salleListModification',
                content: 'Deleted an salle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-salle-my-suffix-delete-popup',
    template: ''
})
export class SalleMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sallePopupService: SalleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sallePopupService
                .open(SalleMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
