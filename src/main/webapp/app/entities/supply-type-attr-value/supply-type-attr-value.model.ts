import { BaseEntity } from './../../shared';

export class SupplyTypeAttrValue implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public product?: BaseEntity,
        public supply?: BaseEntity,
        public supplyType?: BaseEntity,
        public supplyTypeAttr?: BaseEntity,
        public manufacturingOrder?: BaseEntity,
    ) {
    }
}
