import { BaseEntity } from './../../shared';

export class Tracer implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public inTime?: any,
        public startTime?: any,
        public endTime?: any,
        public time?: number,
        public status?: number,
        public workStationConfig?: BaseEntity,
        public manufacturingOrder?: BaseEntity,
        public line?: BaseEntity,
        public workStation?: BaseEntity,
        public prevWorkStation?: BaseEntity,
        public nextWorkStation?: BaseEntity,
        public nextTracer?: BaseEntity,
        public prevTracer?: BaseEntity,
    ) {
    }
}
