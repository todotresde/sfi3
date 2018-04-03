import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MMSEmployeeModule } from './employee/employee.module';
import { MMSLineModule } from './line/line.module';
import { MMSWorkStationConfigModule } from './work-station-config/work-station-config.module';
import { MMSWorkStationModule } from './work-station/work-station.module';
import { MMSManufacturingOrderModule } from './manufacturing-order/manufacturing-order.module';
import { MMSSupplyModule } from './supply/supply.module';
import { MMSSupplyTypeModule } from './supply-type/supply-type.module';
import { MMSSupplyTypeAttrModule } from './supply-type-attr/supply-type-attr.module';
import { MMSSupplyTypeAttrValueModule } from './supply-type-attr-value/supply-type-attr-value.module';
import { MMSProductModule } from './product/product.module';
import { MMSTracerModule } from './tracer/tracer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MMSEmployeeModule,
        MMSLineModule,
        MMSWorkStationConfigModule,
        MMSWorkStationModule,
        MMSManufacturingOrderModule,
        MMSSupplyModule,
        MMSSupplyTypeModule,
        MMSSupplyTypeAttrModule,
        MMSSupplyTypeAttrValueModule,
        MMSProductModule,
        MMSTracerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MMSEntityModule {}
