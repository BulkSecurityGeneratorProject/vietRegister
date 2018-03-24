import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SalleMySuffix } from './salle-my-suffix.model';
import { SalleMySuffixService } from './salle-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-salle-my-suffix',
    templateUrl: './salle-my-suffix.component.html'
})
export class SalleMySuffixComponent implements OnInit, OnDestroy {
salles: SalleMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private salleService: SalleMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.salleService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<SalleMySuffix[]>) => this.salles = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.salleService.query().subscribe(
            (res: HttpResponse<SalleMySuffix[]>) => {
                this.salles = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSalles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SalleMySuffix) {
        return item.id;
    }
    registerChangeInSalles() {
        this.eventSubscriber = this.eventManager.subscribe('salleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
