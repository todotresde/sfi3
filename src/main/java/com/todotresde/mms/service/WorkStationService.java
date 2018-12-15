package com.todotresde.mms.service;

import com.todotresde.mms.domain.*;
import com.todotresde.mms.repository.ProductRepository;
import com.todotresde.mms.repository.WorkStationRepository;
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
public class WorkStationService {

    private final Logger log = LoggerFactory.getLogger(WorkStationService.class);

    private final WorkStationRepository workStationRepository;

    public WorkStationService(WorkStationRepository workStationRepository) {
        this.workStationRepository = workStationRepository;
    }

    public WorkStation save(WorkStation workStation) {
        return this.workStationRepository.save(workStation);
    }

    public WorkStation findOne(Long workStationId) {
        return this.workStationRepository.findOne(workStationId);
    }

}

