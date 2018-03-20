import { BaseEntity } from './../../shared';

export class WorkStationConfig implements BaseEntity {
    constructor(
        public id?: number,
        public first?: boolean,
        public last?: boolean,
        public workStation?: BaseEntity,
        public supplyTypes?: BaseEntity[],
        public employees?: BaseEntity[],
        public prevWorkStations?: BaseEntity[],
        public nextWorkStations?: BaseEntity[],
        public line?: BaseEntity,
    ) {
        this.first = false;
        this.last = false;
    }
}
