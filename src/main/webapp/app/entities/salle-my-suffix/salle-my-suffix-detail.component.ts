import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SalleMySuffix } from './salle-my-suffix.model';
import { SalleMySuffixService } from './salle-my-suffix.service';

@Component({
    selector: 'jhi-salle-my-suffix-detail',
    templateUrl: './salle-my-suffix-detail.component.html'
})
export class SalleMySuffixDetailComponent implements OnInit, OnDestroy {

    salle: SalleMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private salleService: SalleMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSalles();
    }

    load(id) {
        this.salleService.find(id)
            .subscribe((salleResponse: HttpResponse<SalleMySuffix>) => {
                this.salle = salleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSalles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'salleListModification',
            (response) => this.load(this.salle.id)
        );
    }
}
