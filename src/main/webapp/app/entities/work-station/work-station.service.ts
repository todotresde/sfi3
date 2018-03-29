import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { WorkStation } from './work-station.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<WorkStation>;

@Injectable()
export class WorkStationService {

    private resourceUrl =  SERVER_API_URL + 'api/work-stations';

    constructor(private http: HttpClient) { }

    create(workStation: WorkStation): Observable<EntityResponseType> {
        const copy = this.convert(workStation);
        return this.http.post<WorkStation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(workStation: WorkStation): Observable<EntityResponseType> {
        const copy = this.convert(workStation);
        return this.http.put<WorkStation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WorkStation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByIP(ip: String): Observable<EntityResponseType> {
        return this.http.get<WorkStation>(`${this.resourceUrl}/ip/${ip}/`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WorkStation[]>> {
        const options = createRequestOption(req);
        return this.http.get<WorkStation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WorkStation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WorkStation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WorkStation[]>): HttpResponse<WorkStation[]> {
        const jsonResponse: WorkStation[] = res.body;
        const body: WorkStation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WorkStation.
     */
    private convertItemFromServer(workStation: WorkStation): WorkStation {
        const copy: WorkStation = Object.assign({}, workStation);
        return copy;
    }

    /**
     * Convert a WorkStation to a JSON which can be sent to the server.
     */
    private convert(workStation: WorkStation): WorkStation {
        const copy: WorkStation = Object.assign({}, workStation);
        return copy;
    }
}
