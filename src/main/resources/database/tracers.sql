SELECT t.employee_id, t.id, t.work_station_id, t.supply_id, t.jhi_time, sta.name, stav.value 
FROM mms.tracer t
INNER JOIN tracer_supply_type_attr_value tstav ON tstav.tracers_id = t.id
INNER JOIN supply_type_attr_value stav ON stav.id = tstav.supply_type_attr_values_id
INNER JOIN supply_type_attr sta ON sta.id = stav.supply_type_attr_id
WHERE status = 2
ORDER BY t.employee_id, t.id, t.work_station_id, t.supply_id
