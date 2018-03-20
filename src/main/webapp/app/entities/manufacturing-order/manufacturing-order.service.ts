import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderDTO } from '../manufacturing-order-dto/manufacturing-order-dto.model';
import { createRequestOption } from '../../shared';
import { Product } from '../product/product.model';
import { SupplyTypeAttrValue } from '../supply-type-attr-value/supply-type-attr-value.model';

export type EntityResponseType = HttpResponse<ManufacturingOrder>;

@Injectable()
export class ManufacturingOrderService {

    private resourceUrl =  SERVER_API_URL + 'api/manufacturing-orders';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(manufacturingOrder: ManufacturingOrder): Observable<EntityResponseType> {
        const copy = this.convert(manufacturingOrder);
        return this.http.post<ManufacturingOrder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    fullCreate(manufacturingOrder: ManufacturingOrder, products: Product[], supplyTypeAttrValues: SupplyTypeAttrValue[]): Observable<EntityResponseType> {
        const copy = this.convertMOAndProductsAndSupplyTypeAttrValues(manufacturingOrder, products, supplyTypeAttrValues);
        return this.http.post<ManufacturingOrder>(this.resourceUrl + '/products', copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(manufacturingOrder: ManufacturingOrder): Observable<EntityResponseType> {
        const copy = this.convert(manufacturingOrder);
        return this.http.put<ManufacturingOrder>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    fullUpdate(manufacturingOrder: ManufacturingOrder, products: Product[], supplyTypeAttrValues: SupplyTypeAttrValue[]): Observable<EntityResponseType> {
        const copy = this.convertMOAndProductsAndSupplyTypeAttrValues(manufacturingOrder, products, supplyTypeAttrValues);
        return this.http.put<ManufacturingOrder>(this.resourceUrl + '/products', copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ManufacturingOrder>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findFull(id: number): Observable<EntityResponseType> {
        return this.http.get<ManufacturingOrderDTO>(`${this.resourceUrl}/${id}/products`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ManufacturingOrder[]>> {
        const options = createRequestOption(req);
        return this.http.get<ManufacturingOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ManufacturingOrder[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    send(id: number): Observable<ManufacturingOrder> {
        return this.http.get<ManufacturingOrder>(`${this.resourceUrl}/send/${id}`)
            .map((res: HttpResponse<ManufacturingOrder>) => this.convertItemFromServer(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ManufacturingOrder = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ManufacturingOrder[]>): HttpResponse<ManufacturingOrder[]> {
        const jsonResponse: ManufacturingOrder[] = res.body;
        const body: ManufacturingOrder[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ManufacturingOrder.
     */
    private convertItemFromServer(manufacturingOrder: ManufacturingOrder): ManufacturingOrder {
        const copy: ManufacturingOrder = Object.assign({}, manufacturingOrder);
        copy.orderDate = this.dateUtils
            .convertDateTimeFromServer(manufacturingOrder.orderDate);
        return copy;
    }

    /**
     * Convert a ManufacturingOrder to a JSON which can be sent to the server.
     */
    private convert(manufacturingOrder: ManufacturingOrder): ManufacturingOrder {
        const copy: ManufacturingOrder = Object.assign({}, manufacturingOrder);

        copy.orderDate = this.dateUtils.toDate(manufacturingOrder.orderDate);
        return copy;
    }

    /**
     * Convert a ManufacturingOrder and Products to a JSON which can be sent to the server.
     */
    private convertMOAndProductsAndSupplyTypeAttrValues(
        manufacturingOrder: ManufacturingOrder,
        products: Product[],
        supplyTypeAttrValues: SupplyTypeAttrValue[]
    ): any {
        const copyMO: ManufacturingOrder = this.convert(manufacturingOrder);
        const copyProducts: Product[] = products;
        const copySupplyTypeAttrValues: SupplyTypeAttrValue[] = supplyTypeAttrValues;
        const copy: any = {};

        copy['manufacturingOrder'] = copyMO;
        copy['products'] = copyProducts;
        copy['sTAttributeValues'] = copySupplyTypeAttrValues;

        return copy;
    }
}
