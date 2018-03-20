import { BaseEntity } from './../../shared';

export class Supply implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public supplyType?: BaseEntity,
        public products?: BaseEntity[],
    ) {
    }
}
