import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PratiquantMySuffix } from './pratiquant-my-suffix.model';
import { PratiquantMySuffixService } from './pratiquant-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-pratiquant-my-suffix',
    templateUrl: './pratiquant-my-suffix.component.html'
})
export class PratiquantMySuffixComponent implements OnInit, OnDestroy {
pratiquants: PratiquantMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pratiquantService: PratiquantMySuffixService,
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
            this.pratiquantService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<PratiquantMySuffix[]>) => this.pratiquants = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.pratiquantService.query().subscribe(
            (res: HttpResponse<PratiquantMySuffix[]>) => {
                this.pratiquants = res.body;
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
        this.registerChangeInPratiquants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PratiquantMySuffix) {
        return item.id;
    }
    registerChangeInPratiquants() {
        this.eventSubscriber = this.eventManager.subscribe('pratiquantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
