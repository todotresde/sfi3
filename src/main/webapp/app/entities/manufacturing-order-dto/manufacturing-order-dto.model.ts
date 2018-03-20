import { BaseEntity } from './../../shared';

export class ManufacturingOrderDTO implements BaseEntity {
    constructor(
        public id?: number,
        public manufacturingOrder?: BaseEntity,
        public products?: BaseEntity[],
        public sTAttributeValues?: BaseEntity[],
    ) {
    }
}
