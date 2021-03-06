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
        public product?: BaseEntity,
        public supply?: BaseEntity,
        public supplyTypeAttrValues?: BaseEntity[],
        public prevWorkStation?: BaseEntity,
        public nextWorkStation?: BaseEntity,
        public nextTracer?: BaseEntity,
        public prevTracer?: BaseEntity,
        public linearRegression?: BaseEntity
    ) {
    }
}
