import { BaseEntity } from './../../shared';

export class Line implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public workStationConfigs?: BaseEntity[],
    ) {
    }
}
