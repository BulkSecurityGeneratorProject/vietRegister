import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PratiquantMySuffix } from './pratiquant-my-suffix.model';
import { PratiquantMySuffixService } from './pratiquant-my-suffix.service';

@Injectable()
export class PratiquantMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pratiquantService: PratiquantMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.pratiquantService.find(id)
                    .subscribe((pratiquantResponse: HttpResponse<PratiquantMySuffix>) => {
                        const pratiquant: PratiquantMySuffix = pratiquantResponse.body;
                        pratiquant.dateNaissance = this.datePipe
                            .transform(pratiquant.dateNaissance, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.pratiquantModalRef(component, pratiquant);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pratiquantModalRef(component, new PratiquantMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pratiquantModalRef(component: Component, pratiquant: PratiquantMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pratiquant = pratiquant;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
