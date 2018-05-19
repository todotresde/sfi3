package com.todotresde.mms.service;

import com.todotresde.mms.config.Constants;
import com.todotresde.mms.domain.*;
import com.todotresde.mms.repository.TracerRepository;
import com.todotresde.mms.repository.WorkStationRepository;
import com.todotresde.mms.service.dto.TracerTimeProjection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

import static com.todotresde.mms.config.Constants.STATUS_FINISHED;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class TracerService {

    private final Logger log = LoggerFactory.getLogger(TracerService.class);

    private final TracerRepository tracerRepository;
    private final WorkStationRepository workStationRepository;
    private final SupplyTypeAttrValueService supplyTypeAttrValueService;
    private final ManufacturingOrderService manufacturingOrderService;
    private final SchedulerService schedulerService;

    public TracerService(TracerRepository tracerRepository, WorkStationRepository workStationRepository, SupplyTypeAttrValueService supplyTypeAttrValueService, @Lazy ManufacturingOrderService manufacturingOrderService, @Lazy SchedulerService schedulerService) {
        this.tracerRepository = tracerRepository;
        this.workStationRepository = workStationRepository;
        this.supplyTypeAttrValueService = supplyTypeAttrValueService;
        this.manufacturingOrderService = manufacturingOrderService;
        this.schedulerService = schedulerService;
    }

    public void create(Line line, Product product, WorkStationConfig workStationConfig){
        log.debug("Create a Tracer for Product {}", product.getId());

        Supply supply = this.getSupplyForWorkStationConfig(workStationConfig, product);

        List<SupplyTypeAttrValue> supplyTypeAttrValues;
        if (null != supply) {
            supplyTypeAttrValues = this.supplyTypeAttrValueService
                .getByManufacturingOrderAndProductAndSupply(product.getManufacturingOrder(), product, supply);
        } else {
            supplyTypeAttrValues = new ArrayList<>();
        }

        Tracer tracer = new Tracer();
        tracer.setCode(UUID.randomUUID().toString());
        tracer.setInTime(Instant.now());
        tracer.setStatus(Constants.STATUS_CREATED);
        tracer.setWorkStationConfig(workStationConfig);
        tracer.setManufacturingOrder(product.getManufacturingOrder());
        tracer.setProduct(product);
        tracer.setSupply(supply);
        tracer.setSupplyTypeAttrValues(new HashSet<>(supplyTypeAttrValues));
        tracer.setLine(line);
        tracer.setWorkStation(workStationConfig.getWorkStation());
        tracer.setTime(this.schedulerService.getAverageTimeForWorkStationConfig(workStationConfig));
        tracer.setPrevWorkStation(null);
        tracer.setNextWorkStation(null);
        tracer.setEmployee(workStationConfig.getEmployees().iterator().next());

        tracerRepository.save(tracer);
    }

    public Tracer sendFromWorkStationIP(WorkStationConfig workStationConfig, String ip, Tracer tracer){
        WorkStation workStation = this.workStationRepository.findByIp(ip);

        //Validate WorkStation and Tracer
        Boolean validTrace = this.tracerRepository.findByWorkStationAndCode(workStation, tracer.getCode()) != null;

        if(validTrace){
            return this.moveNext(workStationConfig, tracer);
        }

        return null;
    }

    public Tracer send(WorkStationConfig workStationConfig, Tracer tracer){
        //Validate WorkStation and Tracer
        Boolean validTrace = this.tracerRepository.findByWorkStationAndCode(tracer.getWorkStation(), tracer.getCode()) != null;

        if(validTrace){
            return this.moveNext(workStationConfig, tracer);
        }

        return null;
    }

    public Tracer start(Tracer tracer){
        tracer.setStatus(Constants.STATUS_STARTED);
        return this.tracerRepository.save(tracer);
    }

    public Tracer moveNext(WorkStationConfig workStationConfig, Tracer tracer){
        Tracer nextTracer = new Tracer();

        if(workStationConfig != null) {
            Supply supply = this.getSupplyForWorkStationConfig(workStationConfig, tracer.getProduct());

            List<SupplyTypeAttrValue> supplyTypeAttrValues;
            if (null != supply) {
                supplyTypeAttrValues = this.supplyTypeAttrValueService
                    .getByManufacturingOrderAndProductAndSupply(tracer.getProduct().getManufacturingOrder(), tracer.getProduct(), supply);
            } else {
                supplyTypeAttrValues = new ArrayList<>();
            }

            nextTracer.setCode(tracer.getCode());
            nextTracer.setInTime(Instant.now());
            nextTracer.setStatus(Constants.STATUS_CREATED);
            nextTracer.setWorkStationConfig(workStationConfig);
            nextTracer.setManufacturingOrder(tracer.getManufacturingOrder());
            nextTracer.setProduct(tracer.getProduct());
            nextTracer.setSupply(supply);
            nextTracer.setSupplyTypeAttrValues(new HashSet<>(supplyTypeAttrValues));
            nextTracer.setLine(tracer.getLine());
            nextTracer.setWorkStation(workStationConfig.getWorkStation());
            nextTracer.setPrevWorkStation(tracer.getWorkStation());
            nextTracer.setNextWorkStation(null);
            nextTracer.setPrevTracer(tracer);
            nextTracer.setTime(this.schedulerService.getAverageTimeForWorkStationConfig(workStationConfig));
            nextTracer.setEmployee(workStationConfig.getEmployees().iterator().next());

            tracerRepository.save(nextTracer);

            tracer.setNextWorkStation(workStationConfig.getWorkStation());
        }

        tracer.setEndTime(Instant.now());
        //tracer.setTime((int)tracer.getEndTime().getEpochSecond() - (int)tracer.getStartTime().getEpochSecond());
        tracer.setTime(generateRandomTime(tracer.getSupplyTypeAttrValues()));

        tracer.setStatus(STATUS_FINISHED);
        tracer.setNextTracer(null);
        tracerRepository.save(tracer);

        if (workStationConfig == null) {
            this.manufacturingOrderService.productFinished(tracer.getProduct());
        }

        return nextTracer;
    }

    private Integer generateRandomTime(Set<SupplyTypeAttrValue> supplyTypeAttrValues){
        Integer minTime, maxTime;
        Double measure = 1.0;
        for( SupplyTypeAttrValue supplyTypeAttrValue: supplyTypeAttrValues) {
            measure *= Double.parseDouble(supplyTypeAttrValue.getValue());
        }

        if(measure > 30){
            minTime = 15; maxTime = 25;
        }else if(measure > 20){
            minTime = 10; maxTime = 20;
        }else if(measure > 10){
            minTime = 5; maxTime = 15;
        }else if(measure > 5){
            minTime = 2; maxTime = 10;
        }else {
            minTime = 1; maxTime = 5;
        }
        minTime*=60;
        maxTime*=60;
        Integer randTime = (int)(minTime + (Math.random() * ((maxTime - minTime) + 1)));
        return randTime;
    }

    public List<Tracer> getTracersForWorkStation(WorkStation workStation){
        return this.tracerRepository.findByWorkStationAndStatusNot(workStation, Constants.STATUS_FINISHED);
    }

    public List<Tracer> getTracersForWorkStationAndEmployee(WorkStation workStation, Employee employee){
        return this.tracerRepository.findByWorkStationAndEmployeeAndStatus(workStation, employee, Constants.STATUS_FINISHED);
    }

    public Supply getSupplyForWorkStationConfig(WorkStationConfig workStationConfig, Product product) {
        Supply supply = null;

        for( SupplyType supplyType: workStationConfig.getSupplyTypes()) {
            for( Supply productSupply: product.getSupplies()) {
                if(productSupply.getSupplyType().getId() == supplyType.getId()) {
                    supply = productSupply;
                }
            }
        }

        return supply;
    }

    public Integer getTotalForManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.tracerRepository.countByManufacturingOrder(manufacturingOrder);
    }

    public Integer getFinishedForManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.tracerRepository.countByManufacturingOrderAndStatus(manufacturingOrder,STATUS_FINISHED);
    }

    /**
     * Get the total time in a workStation using the WorkStationConfig
     *
     * @param workStationConfig the workStationConfig to get the time
     * @return the time to wait in the workStation
     */
    public Integer getTotalTimeForWorkStationConfig(WorkStationConfig workStationConfig) {
        List<Tracer> tracers = this.tracerRepository.findByWorkStationAndOpen(workStationConfig.getWorkStation());
        Integer sum = 0;
        for( Tracer tracer: tracers) {
            sum += tracer.getTime();
        }
        return sum;
    }

    public Integer getTimeToFinish(Tracer tracer) {
        return this.getTotalTimeForWorkStationConfig(tracer.getWorkStationConfig());
    }

    public List<Tracer> findByManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.tracerRepository.findByManufacturingOrder(manufacturingOrder);
    }

    public List<Tracer> getFinishedForWorkStationConfig(WorkStationConfig workStationConfig) {
        return this.tracerRepository.findByWorkStationAndStatus(workStationConfig.getWorkStation(), STATUS_FINISHED);
    }

    public Tracer findByCodeAndIp(String code, String ip) {
        WorkStation workStation = this.workStationRepository.findByIp(ip);
        return this.tracerRepository.findByWorkStationAndCode(workStation, code);
    }

    public List<TracerTimeProjection> getTimesFromEmployee(Long employeeId) {
        return this.tracerRepository.findTracerTimesForEmployee(employeeId);
    }
}

