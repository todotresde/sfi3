import { BaseEntity } from './../../shared';

export class ManufacturingOrder implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public orderDate?: any,
        public status?: number,
        public description?: string,
    ) {
    }
}
