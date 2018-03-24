import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VilleMySuffix } from './ville-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VilleMySuffix>;

@Injectable()
export class VilleMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/villes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/villes';

    constructor(private http: HttpClient) { }

    create(ville: VilleMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ville);
        return this.http.post<VilleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ville: VilleMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ville);
        return this.http.put<VilleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VilleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VilleMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<VilleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VilleMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<VilleMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<VilleMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VilleMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VilleMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VilleMySuffix[]>): HttpResponse<VilleMySuffix[]> {
        const jsonResponse: VilleMySuffix[] = res.body;
        const body: VilleMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VilleMySuffix.
     */
    private convertItemFromServer(ville: VilleMySuffix): VilleMySuffix {
        const copy: VilleMySuffix = Object.assign({}, ville);
        return copy;
    }

    /**
     * Convert a VilleMySuffix to a JSON which can be sent to the server.
     */
    private convert(ville: VilleMySuffix): VilleMySuffix {
        const copy: VilleMySuffix = Object.assign({}, ville);
        return copy;
    }
}
