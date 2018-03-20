import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SupplyType } from './supply-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SupplyType>;

@Injectable()
export class SupplyTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/supply-types';

    constructor(private http: HttpClient) { }

    create(supplyType: SupplyType): Observable<EntityResponseType> {
        const copy = this.convert(supplyType);
        return this.http.post<SupplyType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(supplyType: SupplyType): Observable<EntityResponseType> {
        const copy = this.convert(supplyType);
        return this.http.put<SupplyType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SupplyType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SupplyType[]>> {
        const options = createRequestOption(req);
        return this.http.get<SupplyType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SupplyType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SupplyType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SupplyType[]>): HttpResponse<SupplyType[]> {
        const jsonResponse: SupplyType[] = res.body;
        const body: SupplyType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SupplyType.
     */
    private convertItemFromServer(supplyType: SupplyType): SupplyType {
        const copy: SupplyType = Object.assign({}, supplyType);
        return copy;
    }

    /**
     * Convert a SupplyType to a JSON which can be sent to the server.
     */
    private convert(supplyType: SupplyType): SupplyType {
        const copy: SupplyType = Object.assign({}, supplyType);
        return copy;
    }
}
