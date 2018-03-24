import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PratiquantMySuffix } from './pratiquant-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PratiquantMySuffix>;

@Injectable()
export class PratiquantMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/pratiquants';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pratiquants';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(pratiquant: PratiquantMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(pratiquant);
        return this.http.post<PratiquantMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pratiquant: PratiquantMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(pratiquant);
        return this.http.put<PratiquantMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PratiquantMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PratiquantMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PratiquantMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PratiquantMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PratiquantMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PratiquantMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PratiquantMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PratiquantMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PratiquantMySuffix[]>): HttpResponse<PratiquantMySuffix[]> {
        const jsonResponse: PratiquantMySuffix[] = res.body;
        const body: PratiquantMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PratiquantMySuffix.
     */
    private convertItemFromServer(pratiquant: PratiquantMySuffix): PratiquantMySuffix {
        const copy: PratiquantMySuffix = Object.assign({}, pratiquant);
        copy.dateNaissance = this.dateUtils
            .convertDateTimeFromServer(pratiquant.dateNaissance);
        return copy;
    }

    /**
     * Convert a PratiquantMySuffix to a JSON which can be sent to the server.
     */
    private convert(pratiquant: PratiquantMySuffix): PratiquantMySuffix {
        const copy: PratiquantMySuffix = Object.assign({}, pratiquant);

        copy.dateNaissance = this.dateUtils.toDate(pratiquant.dateNaissance);
        return copy;
    }
}
