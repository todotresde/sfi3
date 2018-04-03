package com.todotresde.mms.service;

import com.todotresde.mms.domain.Line;
import com.todotresde.mms.domain.Product;
import com.todotresde.mms.domain.WorkStationConfig;
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
public class SchedulerService {

    private final Logger log = LoggerFactory.getLogger(SchedulerService.class);

    private final LineService lineService;
    private final WorkStationConfigService workStationConfigService;

    public SchedulerService(LineService lineService, WorkStationConfigService workStationConfigService) {
        this.lineService = lineService;
        this.workStationConfigService = workStationConfigService;

    }

    public void sendProduct(Product product) {
        log.debug("Send manufacturingOrderProduct to build {}", product.getId());

        Line line = this.getBestLineForProduct(product);

        lineService.sendProduct(line, product);
    }

    private Line getBestLineForProduct(Product product) {
        List<Line> lines = this.lineService.getLineForProduct(product);
        Line bestLine = null;
        Integer time = 999999999;

        for(Line line: lines){
            Integer lineTime = this.getTimeForLine(line);
            if(lineTime < time){
                time = lineTime;
                bestLine = line;
            }
        }

        return bestLine;
    }

    public Integer getTimeForLine(Line line) {
        List<Integer> lineRowTimes = new ArrayList<>();
        List<WorkStationConfig> workStationConfigs = this.workStationConfigService.findByLine(line);
        Integer minRowTime = 999999;

        for(WorkStationConfig workStationConfig: workStationConfigs ){
            if(lineRowTimes.size() <= workStationConfig.getRow()){
                lineRowTimes.add(0);
            }
            lineRowTimes.set(workStationConfig.getRow(), lineRowTimes.get(workStationConfig.getRow()) + this.workStationConfigService.getTimeForWorkStationConfig(workStationConfig));
        }

        for(Integer lineRowTime: lineRowTimes ){
            if(lineRowTime < minRowTime){
                minRowTime = lineRowTime;
            }
        }

        return minRowTime;
    }

    public Integer getAverageTimeForWorkStationConfig(WorkStationConfig workStationConfig) {
        return this.workStationConfigService.getAverageTimeForWorkStationConfig(workStationConfig);
    }
}

