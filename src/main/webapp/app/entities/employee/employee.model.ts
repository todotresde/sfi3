import { BaseEntity } from './../../shared';

export class Employee implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public lastName?: string,
        public user?: BaseEntity,
        public workStationConfigs?: BaseEntity[],
    ) {
    }
}
