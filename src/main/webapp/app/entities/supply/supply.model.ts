import { BaseEntity } from './../../shared';

export class Supply implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public supplyType?: BaseEntity,
        public products?: BaseEntity[],
    ) {
    }
}
