import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Line } from './line.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Line>;

@Injectable()
export class LineService {

    private resourceUrl =  SERVER_API_URL + 'api/lines';

    constructor(private http: HttpClient) { }

    create(line: Line): Observable<EntityResponseType> {
        const copy = this.convert(line);
        return this.http.post<Line>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(line: Line): Observable<EntityResponseType> {
        const copy = this.convert(line);
        return this.http.put<Line>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Line>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Line[]>> {
        const options = createRequestOption(req);
        return this.http.get<Line[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Line[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Line = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Line[]>): HttpResponse<Line[]> {
        const jsonResponse: Line[] = res.body;
        const body: Line[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Line.
     */
    private convertItemFromServer(line: Line): Line {
        const copy: Line = Object.assign({}, line);
        return copy;
    }

    /**
     * Convert a Line to a JSON which can be sent to the server.
     */
    private convert(line: Line): Line {
        const copy: Line = Object.assign({}, line);
        return copy;
    }
}
