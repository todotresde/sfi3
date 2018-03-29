package com.todotresde.sfi3.service;

import com.todotresde.sfi3.domain.*;
import com.todotresde.sfi3.repository.WorkStationConfigRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class WorkStationConfigService {

    private final Logger log = LoggerFactory.getLogger(WorkStationConfigService.class);

    private final WorkStationConfigRepository workStationConfigRepository;
    private final TracerService tracerService;

    public WorkStationConfigService(WorkStationConfigRepository workStationConfigRepository, TracerService tracerService) {
        this.workStationConfigRepository = workStationConfigRepository;
        this.tracerService = tracerService;
    }

    public WorkStationConfig getFirstWorkStationConfigForLine(Line line){
        List<WorkStationConfig> workStationConfigs = this.workStationConfigRepository.findByLineAndFirst(line, true);

        WorkStationConfig bestWorkStationConfig = null;
        Long time = new Long(999999999);

        for(WorkStationConfig workStationConfig: workStationConfigs){
            Long workStationConfigTime = this.getTime(workStationConfig);
            if(workStationConfigTime < time){
                time = workStationConfigTime;
                bestWorkStationConfig = workStationConfig;
            }
        }

        return bestWorkStationConfig;
    }


    public Long getTime(WorkStationConfig workStationConfig) {
        return new Long(this.tracerService.getTracersForWorkStation(workStationConfig.getWorkStation()).size());
    }

    public void create(WorkStationConfig workStationConfig, Line line, Product product){
        this.tracerService.create(line, product, workStationConfig);
    }

    public WorkStationConfig getNextWorkStationConfig(WorkStationConfig workStationConfig, Product product, Supply supply) {
        List<WorkStationConfig> workStationConfigs;
        WorkStationConfig bestWorkStationConfig = null;
        workStationConfig = this.workStationConfigRepository.findOne(workStationConfig.getId());

        if(workStationConfig.getNextWorkStations().size() > 0) {
            if (null != supply) {
                workStationConfigs = this.workStationConfigRepository.getByLineIdAndSupplyTypeId(workStationConfig.getLine(), supply.getSupplyType().getId());
            } else {
                workStationConfigs = this.workStationConfigRepository.getByLineIdAndSupplyTypeIsNull(workStationConfig.getLine());
            }

            if (!workStationConfigs.isEmpty()) {
                Long time = new Long(999999999);

                for (WorkStationConfig workStationConfig1 : workStationConfigs) {
                    Long workStationConfigTime = this.getTime(workStationConfig1);
                    if (workStationConfigTime < time) {
                        time = workStationConfigTime;
                        bestWorkStationConfig = workStationConfig1;
                    }
                }
            }
        }

        return bestWorkStationConfig;
    }

    public WorkStation getNextWorkStation(WorkStationConfig workStationConfig){
        List<WorkStation> nextWorkStations = new ArrayList<WorkStation>(workStationConfig.getNextWorkStations());
        WorkStation bestWorkStation = null;
        Integer maxTracers = new Integer(999999999);

        for(WorkStation workStation: nextWorkStations){
            Integer numberOfTracers = this.tracerService.getTracersForWorkStation(workStation).size();
            if(numberOfTracers < maxTracers){
                maxTracers = numberOfTracers;
                bestWorkStation = workStation;
            }
        }

        return bestWorkStation;
    }

    public Boolean valid(WorkStationConfig workStationConfig) {
        WorkStationConfig workStationConfigResult = this.workStationConfigRepository.findOneByRowAndCol(workStationConfig.getRow(), workStationConfig.getCol());
        if(workStationConfigResult != null && workStationConfig.getId() != null && workStationConfigResult.getId() != workStationConfig.getId()){
            return false;
        }
        if(workStationConfigResult != null && workStationConfig.getId() == null){
            return false;
        }
        return true;
    }
}

