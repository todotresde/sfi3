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
        log.debug("Get first workStation for line {}", line.getId());

        List<WorkStationConfig> workStationConfigs = this.workStationConfigRepository.findByLineAndFirst(line, true);

        WorkStationConfig bestWorkStationConfig = null;
        Integer time = 999999999;

        for(WorkStationConfig workStationConfig: workStationConfigs){
            Integer workStationConfigTime = this.getRowTimeForWorkStationConfig(workStationConfig);
            if(workStationConfigTime < time){
                time = workStationConfigTime;
                bestWorkStationConfig = workStationConfig;
            }
        }

        return bestWorkStationConfig;
    }

    public WorkStationConfig getNextWorkStationConfig(WorkStationConfig workStationConfig, Product product, Supply supply) {
        List<WorkStationConfig> workStationConfigs;
        WorkStationConfig bestWorkStationConfig = null;
        workStationConfig = this.workStationConfigRepository.findOne(workStationConfig.getId());

        if(workStationConfig.getNextWorkStations().size() > 0) {
            if (null != supply) {
                workStationConfigs = this.workStationConfigRepository.getByLineAndRowAndSupplyTypeId(workStationConfig.getLine(), workStationConfig.getRow(), supply.getSupplyType().getId());
            } else {
                workStationConfigs = this.workStationConfigRepository.getByLineAndRowAndSupplyTypeIsNull(workStationConfig.getLine(), workStationConfig.getRow());
            }

            if (!workStationConfigs.isEmpty()) {
                Integer time = 999999999;

                for (WorkStationConfig workStationConfig1 : workStationConfigs) {
                    Integer workStationConfigTime = this.getTimeForWorkStationConfig(workStationConfig1);
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
        List<WorkStation> nextWorkStations = new ArrayList<>(workStationConfig.getNextWorkStations());
        WorkStation bestWorkStation = null;
        Integer maxTracers = 999999999;

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
        return !(workStationConfigResult != null && workStationConfig.getId() == null);
    }

    public Integer getRowTimeForWorkStationConfig(WorkStationConfig workStationConfig) {
        List <WorkStationConfig> workStationConfigs = this.workStationConfigRepository.findByLineAndRow(workStationConfig.getLine(), workStationConfig.getRow());
        Integer sumTime = 0;
        for(WorkStationConfig workStationConfig1: workStationConfigs) {
            sumTime += this.tracerService.getTotalTimeForWorkStationConfig(workStationConfig1);
        }
        return sumTime;
    }

    public Integer getTimeForWorkStationConfig(WorkStationConfig workStationConfig) {
        return this.tracerService.getTotalTimeForWorkStationConfig(workStationConfig);
    }

    public List<WorkStationConfig> findByLine(Line line) {
        return this.workStationConfigRepository.findByLine(line);
    }
}

