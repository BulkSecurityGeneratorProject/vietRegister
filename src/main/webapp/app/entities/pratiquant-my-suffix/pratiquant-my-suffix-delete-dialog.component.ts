import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PratiquantMySuffix } from './pratiquant-my-suffix.model';
import { PratiquantMySuffixPopupService } from './pratiquant-my-suffix-popup.service';
import { PratiquantMySuffixService } from './pratiquant-my-suffix.service';

@Component({
    selector: 'jhi-pratiquant-my-suffix-delete-dialog',
    templateUrl: './pratiquant-my-suffix-delete-dialog.component.html'
})
export class PratiquantMySuffixDeleteDialogComponent {

    pratiquant: PratiquantMySuffix;

    constructor(
        private pratiquantService: PratiquantMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pratiquantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pratiquantListModification',
                content: 'Deleted an pratiquant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pratiquant-my-suffix-delete-popup',
    template: ''
})
export class PratiquantMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pratiquantPopupService: PratiquantMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pratiquantPopupService
                .open(PratiquantMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
