import { BaseEntity } from './../../shared';

export class SupplyTypeAttr implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public supplyTypes?: BaseEntity[],
    ) {
    }
}
