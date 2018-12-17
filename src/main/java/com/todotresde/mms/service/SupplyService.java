package com.todotresde.mms.service;

import com.todotresde.mms.domain.*;
import com.todotresde.mms.repository.SupplyRepository;
import com.todotresde.mms.repository.SupplyTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class SupplyService {

    private final Logger log = LoggerFactory.getLogger(SupplyService.class);

    private final SupplyRepository supplyRepository;
    private final SupplyTypeRepository supplyTypeRepository;

    public SupplyService(SupplyRepository supplyRepository, SupplyTypeRepository supplyTypeRepository) {
        this.supplyRepository = supplyRepository;
        this.supplyTypeRepository = supplyTypeRepository;
    }

    public Supply findOne(Long supplyId) {
        return this.supplyRepository.findOne(supplyId);
    }

    public List<Supply> importSupplies(){
        log.debug("Import supplies from file");
        List<Supply> supplies = new ArrayList();

        try (Stream<String> lines = Files.lines(Paths.get(ResourceUtils.getFile("classpath:import/articulos.txt").getPath()), Charset.forName("Cp1252")))  {

            lines.forEach(line -> {
                String supplyTypeName = line.substring(178, 193).replaceAll("\\s+$", "");
                String supplyCode = line.substring(0, 5).replaceAll("\\s+$", "") + line.substring(117, 120).replaceAll("\\s+$", "");
                String supplyName = line.substring(5, 65).replaceAll("\\s+$", "");

                if(!supplyTypeName.equals("")) {
                    SupplyType supplyType = supplyTypeRepository.findByName(supplyTypeName);
                    Supply supplyDB = supplyRepository.findOneByName(supplyName);

                    if(null != supplyType){
                        Supply supply;
                        supply = (null != supplyDB) ? supply = supplyDB : new Supply();
                        supply.setCode(supplyCode);
                        supply.setName(supplyName);
                        supply.setSupplyType(supplyType);
                        supplies.add(supply);
                    }
                }
            });
            lines.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        this.save(supplies);

        return supplies;
    }

    private void save(List<Supply> supplies){
        this.supplyRepository.save(supplies);
    }

}

