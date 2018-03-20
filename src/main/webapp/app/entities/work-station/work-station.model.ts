import { BaseEntity } from './../../shared';

export class WorkStation implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public shortName?: string,
        public ip?: string,
        public prevWorkStationConfigs?: BaseEntity[],
        public nextWorkStationConfigs?: BaseEntity[],
    ) {
    }
}
