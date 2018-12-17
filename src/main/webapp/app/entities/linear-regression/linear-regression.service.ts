import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Tracer } from './../tracer/tracer.model';
import { LinearRegression } from './linear-regression.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LinearRegression>;

@Injectable()
export class LinearRegressionService {

    private resourceUrl =  SERVER_API_URL + 'api/linear-regressions';

    constructor(private http: HttpClient) { }

    create(linearRegression: LinearRegression): Observable<EntityResponseType> {
        const copy = this.convert(linearRegression);
        return this.http.post<LinearRegression>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(linearRegression: LinearRegression): Observable<EntityResponseType> {
        const copy = this.convert(linearRegression);
        return this.http.put<LinearRegression>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LinearRegression>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByGroup(lineId: number, workStationConfigId: number, workStationId: number, employeeId: number, supplyId: number): Observable<HttpResponse<LinearRegression[]>> {
        return this.http.get<LinearRegression[]>(`${this.resourceUrl}/bygroup/${lineId}/${workStationConfigId}/${workStationId}/${employeeId}/${supplyId}`, { observe: 'response'})
            .map((res: HttpResponse<LinearRegression[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LinearRegression[]>> {
        const options = createRequestOption(req);
        return this.http.get<LinearRegression[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LinearRegression[]>) => this.convertArrayResponse(res));
    }

    getTracers(lineId: number, workStationConfigId: number, workStationId: number, employeeId: number, supplyId: number): Observable<HttpResponse<Tracer[]>> {
        return this.http.get<Tracer[]>(`${this.resourceUrl}/tracers/bygroup/${lineId}/${workStationConfigId}/${workStationId}/${employeeId}/${supplyId}`, { observe: 'response' })
            .map((res: HttpResponse<Tracer[]>) => this.convertArrayResponse(res));
    }

    learn(numberOfClusters: number, numberOfIterations: number): Observable<HttpResponse<LinearRegression[]>> {
        const options = createRequestOption();
        return this.http.get<LinearRegression[]>(`${this.resourceUrl}/generate/${numberOfClusters}/${numberOfIterations}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<LinearRegression[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LinearRegression = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LinearRegression[]>): HttpResponse<LinearRegression[]> {
        const jsonResponse: LinearRegression[] = res.body;
        const body: LinearRegression[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LinearRegression.
     */
    private convertItemFromServer(linearRegression: LinearRegression): LinearRegression {
        const copy: LinearRegression = Object.assign({}, linearRegression);
        return copy;
    }

    /**
     * Convert a LinearRegression to a JSON which can be sent to the server.
     */
    private convert(linearRegression: LinearRegression): LinearRegression {
        const copy: LinearRegression = Object.assign({}, linearRegression);
        return copy;
    }
}
