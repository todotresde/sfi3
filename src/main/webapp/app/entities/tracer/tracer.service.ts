import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TracerTimeDTO } from '../tracer-time-dto/tracer-time-dto.model';
import { Tracer } from './tracer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Tracer>;

@Injectable()
export class TracerService {

    private resourceUrl =  SERVER_API_URL + 'api/tracers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(tracer: Tracer): Observable<EntityResponseType> {
        const copy = this.convert(tracer);
        return this.http.post<Tracer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    send(tracer: Tracer): Observable<Tracer> {
        const copy = this.convert(tracer);
        return this.http.post<Tracer>(`${this.resourceUrl}/send`, copy)
            .map((res: EntityResponseType) => this.convertItemFromServer(res));
    }

    start(tracer: Tracer): Observable<Tracer> {
        const copy = this.convert(tracer);
        return this.http.post<Tracer>(`${this.resourceUrl}/start`, copy)
            .map((res: EntityResponseType) => this.convertItemFromServer(res));
    }

    update(tracer: Tracer): Observable<EntityResponseType> {
        const copy = this.convert(tracer);
        return this.http.put<Tracer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Tracer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByCodeAndIp(code: string, ip: string): Observable<EntityResponseType> {
        return this.http.get<Tracer>(`${this.resourceUrl}/code/${code}/ip/${ip}/`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Tracer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Tracer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Tracer[]>) => this.convertArrayResponse(res));
    }

    queryByManufacturingOrderId(manufacturingOrderId: string): Observable<HttpResponse<Tracer[]>> {
        return this.http.get<Tracer[]>(`${this.resourceUrl}/manufacturing-order/${manufacturingOrderId}/`, { observe: 'response' })
            .map((res: HttpResponse<Tracer[]>) => this.convertArrayResponse(res));
    }

    queryByWorkStationIP(ip: string): Observable<HttpResponse<Tracer[]>> {
        return this.http.get<Tracer[]>(`${this.resourceUrl}/workStationIP/${ip}/`, { observe: 'response' })
            .map((res: HttpResponse<Tracer[]>) => this.convertArrayResponse(res));
    }

    queryOpen(manufacturingOrderId: string): Observable<HttpResponse<Tracer[]>> {
        if (manufacturingOrderId) {
            return this.http.get<Tracer[]>(`${this.resourceUrl}/open/manufacturing-order/${manufacturingOrderId}/`, { observe: 'response' })
            .map((res: HttpResponse<Tracer[]>) => this.convertArrayResponse(res));
        } else {
            return this.http.get<Tracer[]>(`${this.resourceUrl}/open/`, { observe: 'response' })
                .map((res: HttpResponse<Tracer[]>) => this.convertArrayResponse(res));
        }
    }

    queryTimeForEmployee(employeeId: string): Observable<HttpResponse<TracerTimeDTO[]>> {
        return this.http.get<TracerTimeDTO[]>(`${this.resourceUrl}/time/employee/${employeeId}/`, { observe: 'response' })
            .map((res: HttpResponse<Tracer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Tracer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Tracer[]>): HttpResponse<Tracer[]> {
        const jsonResponse: Tracer[] = res.body;
        const body: Tracer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Tracer.
     */
    private convertItemFromServer(tracer: Tracer): Tracer {
        const copy: Tracer = Object.assign({}, tracer);
        copy.inTime = this.dateUtils
            .convertDateTimeFromServer(tracer.inTime);
        copy.startTime = this.dateUtils
            .convertDateTimeFromServer(tracer.startTime);
        copy.endTime = this.dateUtils
            .convertDateTimeFromServer(tracer.endTime);
        return copy;
    }

    /**
     * Convert a Tracer to a JSON which can be sent to the server.
     */
    private convert(tracer: Tracer): Tracer {
        const copy: Tracer = Object.assign({}, tracer);

        copy.inTime = this.dateUtils.toDate(tracer.inTime);

        copy.startTime = this.dateUtils.toDate(tracer.startTime);

        copy.endTime = this.dateUtils.toDate(tracer.endTime);
        return copy;
    }
}
