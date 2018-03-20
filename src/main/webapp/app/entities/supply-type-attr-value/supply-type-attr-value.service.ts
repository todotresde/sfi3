import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SupplyTypeAttrValue } from './supply-type-attr-value.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SupplyTypeAttrValue>;

@Injectable()
export class SupplyTypeAttrValueService {

    private resourceUrl =  SERVER_API_URL + 'api/supply-type-attr-values';

    constructor(private http: HttpClient) { }

    create(supplyTypeAttrValue: SupplyTypeAttrValue): Observable<EntityResponseType> {
        const copy = this.convert(supplyTypeAttrValue);
        return this.http.post<SupplyTypeAttrValue>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supplyTypeAttrValue: SupplyTypeAttrValue): Observable<EntityResponseType> {
        const copy = this.convert(supplyTypeAttrValue);
        return this.http.put<SupplyTypeAttrValue>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SupplyTypeAttrValue>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SupplyTypeAttrValue[]>> {
        const options = createRequestOption(req);
        return this.http.get<SupplyTypeAttrValue[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SupplyTypeAttrValue[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SupplyTypeAttrValue = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SupplyTypeAttrValue[]>): HttpResponse<SupplyTypeAttrValue[]> {
        const jsonResponse: SupplyTypeAttrValue[] = res.body;
        const body: SupplyTypeAttrValue[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SupplyTypeAttrValue.
     */
    private convertItemFromServer(supplyTypeAttrValue: SupplyTypeAttrValue): SupplyTypeAttrValue {
        const copy: SupplyTypeAttrValue = Object.assign({}, supplyTypeAttrValue);
        return copy;
    }

    /**
     * Convert a SupplyTypeAttrValue to a JSON which can be sent to the server.
     */
    private convert(supplyTypeAttrValue: SupplyTypeAttrValue): SupplyTypeAttrValue {
        const copy: SupplyTypeAttrValue = Object.assign({}, supplyTypeAttrValue);
        return copy;
    }
}
