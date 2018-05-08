set foreign_key_checks = 0;
delete from tracer_supply_type_attr_value where tracers_id > 0;
delete from tracer where id > 0;
delete from manufacturing_order where id > 0;
set foreign_key_checks = 1;