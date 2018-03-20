import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Sfi3EmployeeModule } from './employee/employee.module';
import { Sfi3LineModule } from './line/line.module';
import { Sfi3WorkStationConfigModule } from './work-station-config/work-station-config.module';
import { Sfi3WorkStationModule } from './work-station/work-station.module';
import { Sfi3ManufacturingOrderModule } from './manufacturing-order/manufacturing-order.module';
import { Sfi3SupplyModule } from './supply/supply.module';
import { Sfi3SupplyTypeModule } from './supply-type/supply-type.module';
import { Sfi3SupplyTypeAttrModule } from './supply-type-attr/supply-type-attr.module';
import { Sfi3SupplyTypeAttrValueModule } from './supply-type-attr-value/supply-type-attr-value.module';
import { Sfi3ProductModule } from './product/product.module';
import { Sfi3TracerModule } from './tracer/tracer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Sfi3EmployeeModule,
        Sfi3LineModule,
        Sfi3WorkStationConfigModule,
        Sfi3WorkStationModule,
        Sfi3ManufacturingOrderModule,
        Sfi3SupplyModule,
        Sfi3SupplyTypeModule,
        Sfi3SupplyTypeAttrModule,
        Sfi3SupplyTypeAttrValueModule,
        Sfi3ProductModule,
        Sfi3TracerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi3EntityModule {}
