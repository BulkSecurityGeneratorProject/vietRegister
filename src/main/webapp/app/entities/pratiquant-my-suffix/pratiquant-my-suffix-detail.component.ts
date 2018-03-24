import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PratiquantMySuffix } from './pratiquant-my-suffix.model';
import { PratiquantMySuffixService } from './pratiquant-my-suffix.service';

@Component({
    selector: 'jhi-pratiquant-my-suffix-detail',
    templateUrl: './pratiquant-my-suffix-detail.component.html'
})
export class PratiquantMySuffixDetailComponent implements OnInit, OnDestroy {

    pratiquant: PratiquantMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pratiquantService: PratiquantMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPratiquants();
    }

    load(id) {
        this.pratiquantService.find(id)
            .subscribe((pratiquantResponse: HttpResponse<PratiquantMySuffix>) => {
                this.pratiquant = pratiquantResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPratiquants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pratiquantListModification',
            (response) => this.load(this.pratiquant.id)
        );
    }
}
