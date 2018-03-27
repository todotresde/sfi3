import { BaseEntity } from './../../shared';

export class SubLine implements BaseEntity {
    constructor(
        public id?: number,
        public workStations?: BaseEntity[],
        public line?: BaseEntity,
    ) {
    }
}
