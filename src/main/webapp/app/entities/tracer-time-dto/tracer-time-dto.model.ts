import { BaseEntity } from './../../shared';

export class TracerTimeDTO implements BaseEntity {
    constructor(
        public id?: number,
        public employeeId?: number,
    	public tracerId?: number,
    	public workStationId?: number,
    	public supplyId?: number,
        public supplyTypeId?: number,
   		public time?: number,
    	public name?: string,
    	public value?: string,
    ) {
    }
}
