import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VilleMySuffix } from './ville-my-suffix.model';
import { VilleMySuffixPopupService } from './ville-my-suffix-popup.service';
import { VilleMySuffixService } from './ville-my-suffix.service';

@Component({
    selector: 'jhi-ville-my-suffix-delete-dialog',
    templateUrl: './ville-my-suffix-delete-dialog.component.html'
})
export class VilleMySuffixDeleteDialogComponent {

    ville: VilleMySuffix;

    constructor(
        private villeService: VilleMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.villeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'villeListModification',
                content: 'Deleted an ville'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ville-my-suffix-delete-popup',
    template: ''
})
export class VilleMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private villePopupService: VilleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.villePopupService
                .open(VilleMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
