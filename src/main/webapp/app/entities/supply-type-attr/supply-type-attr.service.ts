import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SupplyTypeAttr } from './supply-type-attr.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SupplyTypeAttr>;

@Injectable()
export class SupplyTypeAttrService {

    private resourceUrl =  SERVER_API_URL + 'api/supply-type-attrs';

    constructor(private http: HttpClient) { }

    create(supplyTypeAttr: SupplyTypeAttr): Observable<EntityResponseType> {
        const copy = this.convert(supplyTypeAttr);
        return this.http.post<SupplyTypeAttr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supplyTypeAttr: SupplyTypeAttr): Observable<EntityResponseType> {
        const copy = this.convert(supplyTypeAttr);
        return this.http.put<SupplyTypeAttr>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SupplyTypeAttr>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SupplyTypeAttr[]>> {
        const options = createRequestOption(req);
        return this.http.get<SupplyTypeAttr[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SupplyTypeAttr[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SupplyTypeAttr = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SupplyTypeAttr[]>): HttpResponse<SupplyTypeAttr[]> {
        const jsonResponse: SupplyTypeAttr[] = res.body;
        const body: SupplyTypeAttr[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SupplyTypeAttr.
     */
    private convertItemFromServer(supplyTypeAttr: SupplyTypeAttr): SupplyTypeAttr {
        const copy: SupplyTypeAttr = Object.assign({}, supplyTypeAttr);
        return copy;
    }

    /**
     * Convert a SupplyTypeAttr to a JSON which can be sent to the server.
     */
    private convert(supplyTypeAttr: SupplyTypeAttr): SupplyTypeAttr {
        const copy: SupplyTypeAttr = Object.assign({}, supplyTypeAttr);
        return copy;
    }
}
