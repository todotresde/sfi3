import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public quantity?: number,
        public manufacturingOrder?: BaseEntity,
        public supplies?: BaseEntity[],
    ) {
    }
}
