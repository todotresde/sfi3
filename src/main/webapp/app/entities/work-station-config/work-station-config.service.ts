import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { WorkStationConfig } from './work-station-config.model';
import { WorkStationConfigDTO } from '../work-station-config-dto/work-station-config-dto.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<WorkStationConfig>;

@Injectable()
export class WorkStationConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/work-station-configs';

    constructor(private http: HttpClient) { }

    create(workStationConfig: WorkStationConfig): Observable<EntityResponseType> {
        const copy = this.convert(workStationConfig);
        return this.http.post<WorkStationConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(workStationConfig: WorkStationConfig): Observable<EntityResponseType> {
        const copy = this.convert(workStationConfig);
        return this.http.put<WorkStationConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WorkStationConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WorkStationConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<WorkStationConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WorkStationConfig[]>) => this.convertArrayResponse(res));
    }

    queryTime(req?: any): Observable<HttpResponse<WorkStationConfigDTO[]>> {
        const options = createRequestOption(req);
        return this.http.get<WorkStationConfigDTO[]>(`${this.resourceUrl}/time`, { params: options, observe: 'response' })
            .map((res: HttpResponse<WorkStationConfigDTO[]>) => this.convertArrayResponseDTO(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WorkStationConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WorkStationConfig[]>): HttpResponse<WorkStationConfig[]> {
        const jsonResponse: WorkStationConfig[] = res.body;
        const body: WorkStationConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertArrayResponseDTO(res: HttpResponse<WorkStationConfigDTO[]>): HttpResponse<WorkStationConfigDTO[]> {
        const jsonResponse: WorkStationConfigDTO[] = res.body;
        const body: WorkStationConfigDTO[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WorkStationConfig.
     */
    private convertItemFromServer(workStationConfig: WorkStationConfig): WorkStationConfig {
        const copy: WorkStationConfig = Object.assign({}, workStationConfig);
        return copy;
    }

    /**
     * Convert a WorkStationConfig to a JSON which can be sent to the server.
     */
    private convert(workStationConfig: WorkStationConfig): WorkStationConfig {
        const copy: WorkStationConfig = Object.assign({}, workStationConfig);
        return copy;
    }
}
