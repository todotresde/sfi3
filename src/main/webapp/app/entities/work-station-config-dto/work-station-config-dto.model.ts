import { BaseEntity } from './../../shared';

export class WorkStationConfigDTO implements BaseEntity {
    constructor(
        public id?: number,
        public first?: boolean,
        public last?: boolean,
        public row?: number,
        public col?: number,
        public workStation?: BaseEntity,
        public supplyTypes?: BaseEntity[],
        public employees?: BaseEntity[],
        public prevWorkStations?: BaseEntity[],
        public nextWorkStations?: BaseEntity[],
        public line?: BaseEntity,
        public time?: number,
        public averageTime?: number
    ) {
        this.first = false;
        this.last = false;
    }
}
