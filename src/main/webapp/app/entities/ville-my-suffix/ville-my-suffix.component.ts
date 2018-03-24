import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VilleMySuffix } from './ville-my-suffix.model';
import { VilleMySuffixService } from './ville-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-ville-my-suffix',
    templateUrl: './ville-my-suffix.component.html'
})
export class VilleMySuffixComponent implements OnInit, OnDestroy {
villes: VilleMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private villeService: VilleMySuffixService,
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
            this.villeService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<VilleMySuffix[]>) => this.villes = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.villeService.query().subscribe(
            (res: HttpResponse<VilleMySuffix[]>) => {
                this.villes = res.body;
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
        this.registerChangeInVilles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VilleMySuffix) {
        return item.id;
    }
    registerChangeInVilles() {
        this.eventSubscriber = this.eventManager.subscribe('villeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
