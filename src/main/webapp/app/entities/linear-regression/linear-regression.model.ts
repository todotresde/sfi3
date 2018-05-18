import { BaseEntity } from './../../shared';

export class LinearRegression implements BaseEntity {
    constructor(
        public id?: number,
        public dimension?: number,
        public x?: number,
        public beta0?: number,
        public beta1?: number,
        public line?: BaseEntity,
        public workStationConfig?: BaseEntity,
        public workStation?: BaseEntity,
        public supply?: BaseEntity,
        public supplyType?: BaseEntity,
        public employee?: BaseEntity,
    ) {
    }
}
