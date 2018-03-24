import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SalleMySuffix } from './salle-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SalleMySuffix>;

@Injectable()
export class SalleMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/salles';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/salles';

    constructor(private http: HttpClient) { }

    create(salle: SalleMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(salle);
        return this.http.post<SalleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(salle: SalleMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(salle);
        return this.http.put<SalleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SalleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SalleMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SalleMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<SalleMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalleMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SalleMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SalleMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SalleMySuffix[]>): HttpResponse<SalleMySuffix[]> {
        const jsonResponse: SalleMySuffix[] = res.body;
        const body: SalleMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SalleMySuffix.
     */
    private convertItemFromServer(salle: SalleMySuffix): SalleMySuffix {
        const copy: SalleMySuffix = Object.assign({}, salle);
        return copy;
    }

    /**
     * Convert a SalleMySuffix to a JSON which can be sent to the server.
     */
    private convert(salle: SalleMySuffix): SalleMySuffix {
        const copy: SalleMySuffix = Object.assign({}, salle);
        return copy;
    }
}
