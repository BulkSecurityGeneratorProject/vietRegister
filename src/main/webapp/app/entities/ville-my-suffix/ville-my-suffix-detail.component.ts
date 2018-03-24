import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VilleMySuffix } from './ville-my-suffix.model';
import { VilleMySuffixService } from './ville-my-suffix.service';

@Component({
    selector: 'jhi-ville-my-suffix-detail',
    templateUrl: './ville-my-suffix-detail.component.html'
})
export class VilleMySuffixDetailComponent implements OnInit, OnDestroy {

    ville: VilleMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private villeService: VilleMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVilles();
    }

    load(id) {
        this.villeService.find(id)
            .subscribe((villeResponse: HttpResponse<VilleMySuffix>) => {
                this.ville = villeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVilles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'villeListModification',
            (response) => this.load(this.ville.id)
        );
    }
}
