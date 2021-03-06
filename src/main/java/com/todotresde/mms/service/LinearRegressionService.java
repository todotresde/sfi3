package com.todotresde.mms.service;

import com.todotresde.mms.domain.*;
import com.todotresde.mms.repository.LinearRegressionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class LinearRegressionService {
    private final Logger log = LoggerFactory.getLogger(LinearRegressionService.class);

    private final LinearRegressionRepository linearRegressionRepository;
    private final WorkStationConfigService workStationConfigService;
    private final TracerService tracerService;
    private final LineService lineService;
    private final WorkStationService workStationService;
    private final EmployeeService employeeService;
    private final SupplyService supplyService;

    public LinearRegressionService(WorkStationConfigService workStationConfigService, TracerService tracerService, LinearRegressionRepository linearRegressionRepository,
                                   LineService lineService, EmployeeService employeeService, WorkStationService workStationService, SupplyService supplyService) {
        this.linearRegressionRepository = linearRegressionRepository;
        this.workStationConfigService = workStationConfigService;
        this.tracerService = tracerService;
        this.lineService = lineService;
        this.workStationService = workStationService;
        this.employeeService = employeeService;
        this.supplyService = supplyService;

    }

    public List<LinearRegression> findByLineAndWorkStationConfigAndWorkStationAndEmployee(Long lineId, Long workStationConfigId, Long workStationId, Long employeeId){
        Line line = this.lineService.findOne(lineId);
        WorkStationConfig workStationConfig = this.workStationConfigService.findOne(workStationConfigId);
        WorkStation workStation = this.workStationService.findOne(workStationId);
        Employee employee = this.employeeService.findOne(employeeId);

        return this.linearRegressionRepository.findByLineAndWorkStationConfigAndWorkStationAndEmployee(line, workStationConfig, workStation, employee);
    }

    public List<LinearRegression> findByLineAndWorkStationConfigAndWorkStationAndEmployeeAndSupply(Long lineId, Long workStationConfigId, Long workStationId, Long employeeId, Long supplyId){
        Line line = this.lineService.findOne(lineId);
        WorkStationConfig workStationConfig = this.workStationConfigService.findOne(workStationConfigId);
        WorkStation workStation = this.workStationService.findOne(workStationId);
        Employee employee = this.employeeService.findOne(employeeId);
        Supply supply = this.supplyService.findOne(supplyId);

        return this.linearRegressionRepository.findByLineAndWorkStationConfigAndWorkStationAndEmployeeAndSupply(line, workStationConfig, workStation, employee, supply);
    }

    public List<LinearRegression> generate(Integer numberOfClusters, Integer numberOfIterations) {
        this.linearRegressionRepository.deleteAll();
        this.tracerService.clearLineRegressions();
        List<WorkStationConfig> workStationConfigs = this.workStationConfigService.findAll();
        for(WorkStationConfig workStationConfig : workStationConfigs) {
            for(Employee employee : workStationConfig.getEmployees()) {
                for(SupplyType supplyType : workStationConfig.getSupplyTypes()) {
                    List<Tracer> tracers = this.findAllTracers(workStationConfig.getLine(), workStationConfig, workStationConfig.getWorkStation(), employee);
                    List<List<Tracer>> clusters = this.clusterTracers(tracers, numberOfClusters, numberOfIterations);

                    for(List<Tracer> cluster : clusters) {
                        if (cluster.size() > 0) {
                            Double[] betas = this.generateLinearRegression(cluster);
                            Double x = this.executeLinearRegression(1.0, betas);

                            LinearRegression linearRegression = new LinearRegression();
                            linearRegression.setCluster(clusters.indexOf(cluster));
                            linearRegression.setBeta0(betas[0]);
                            linearRegression.setBeta1(betas[1]);
                            linearRegression.setX(x);
                            linearRegression.setDimension(cluster.size());
                            linearRegression.setLine(workStationConfig.getLine());
                            linearRegression.setWorkStationConfig(workStationConfig);
                            linearRegression.setWorkStation(workStationConfig.getWorkStation());
                            linearRegression.setSupply(cluster.iterator().next().getSupply());
                            linearRegression.setSupplyType(supplyType);
                            linearRegression.setEmployee(employee);
                            linearRegression.setTracers(new HashSet<Tracer>(cluster));

                            this.linearRegressionRepository.save(linearRegression);

                            for(Tracer tracer : cluster){
                                tracer.setLinearRegression(linearRegression);
                                this.tracerService.save(tracer);
                            }
                        }
                    }
                }
            }
        }

        return this.linearRegressionRepository.findAll();
    }

    public List<Tracer> findAllTracers(LinearRegression linearRegression) {
        return this.tracerService.getTracersForLinearRegression(linearRegression);
    }

    public List<Tracer> findAllTracers(WorkStationConfig workStationConfig, Employee employee) {
        return this.tracerService.getTracersForWorkStationAndEmployee(workStationConfig.getWorkStation(), employee);
    }

    public List<Tracer> findAllTracers(Line line, WorkStationConfig workStationConfig, WorkStation workStation, Employee employee) {
        return this.tracerService.getTracersForLineAndWorkStationConfigAndWorkStationAndEmployee(line, workStationConfig, workStation, employee);
    }

    public List<Tracer> findAllTracers(Line line, WorkStationConfig workStationConfig, WorkStation workStation, Employee employee, Supply supply) {
        return this.tracerService.getTracersForLineAndWorkStationConfigAndWorkStationAndEmployeeAndSupply(line, workStationConfig, workStation, employee, supply);
    }

    public List<Tracer> findAllTracersByLineAndWorkStationConfigAndWorkStationAndEmployee(Long lineId, Long workStationConfigId, Long workStationId, Long employeeId){
        Line line = this.lineService.findOne(lineId);
        WorkStationConfig workStationConfig = this.workStationConfigService.findOne(workStationConfigId);
        WorkStation workStation = this.workStationService.findOne(workStationId);
        Employee employee = this.employeeService.findOne(employeeId);

        return this.tracerService.getTracersForLineAndWorkStationConfigAndWorkStationAndEmployee(line, workStationConfig, workStation, employee);
    }

    public List<Tracer> findAllTracersByLineAndWorkStationConfigAndWorkStationAndEmployeeAndSupply(Long lineId, Long workStationConfigId, Long workStationId, Long employeeId, Long supplyId){
        Line line = this.lineService.findOne(lineId);
        WorkStationConfig workStationConfig = this.workStationConfigService.findOne(workStationConfigId);
        WorkStation workStation = this.workStationService.findOne(workStationId);
        Employee employee = this.employeeService.findOne(employeeId);
        Supply supply = this.supplyService.findOne(supplyId);

        return this.tracerService.getTracersForLineAndWorkStationConfigAndWorkStationAndEmployeeAndSupply(line, workStationConfig, workStation, employee, supply);
    }

    private Double executeLinearRegression(Double x, Double[] betas) {
        //y =  beta1 * x + beta0
        return betas[1] * x + betas[0];
    }

    private Double[] generateLinearRegression(List<Tracer> tracers) {
        Integer MAXN = 1000;
        Integer n = 0;
        Double[] x = new Double[MAXN];
        Double[] y = new Double[MAXN];

        // First pass: read in data, compute xbar and ybar
        Double sumx = 0.0, sumy = 0.0, sumx2 = 0.0;
        for(Tracer tracer: tracers) {
            Double measure = 1.0;
            for(SupplyTypeAttrValue supplyTypeAttrValue : tracer.getSupplyTypeAttrValues()) {
                measure *= Double.parseDouble(supplyTypeAttrValue.getValue());
            }
            x[n] = measure;
            y[n] = new Double(tracer.getTime()) / 60;
            sumx  += x[n];
            sumx2 += x[n] * x[n];
            sumy  += y[n];
            n++;
        }
        Double xbar = sumx / n;
        Double ybar = sumy / n;

        // Second pass: compute summary statistics
        Double xxbar = 0.0, yybar = 0.0, xybar = 0.0;
        for (Integer i = 0; i < n; i++) {
            xxbar += (x[i] - xbar) * (x[i] - xbar);
            yybar += (y[i] - ybar) * (y[i] - ybar);
            xybar += (x[i] - xbar) * (y[i] - ybar);
        }
        Double beta1 = (Double.isNaN(xybar / xxbar)) ? 0 : (xybar / xxbar);
        Double beta0 = ybar - beta1 * xbar;

        // StdOut.println("y   = " + beta1 + " * x + " + beta0);

        // Analyze results
        Integer df = n - 2;
        Double rss = 0.0;      // residual sum of squares
        Double ssr = 0.0;      // regression sum of squares
        for (Integer i = 0; i < n; i++) {
            Double fit = beta1*x[i] + beta0;
            rss += (fit - y[i]) * (fit - y[i]);
            ssr += (fit - ybar) * (fit - ybar);
        }
        Double R2    = ssr / yybar;
        Double svar  = rss / df;
        Double svar1 = svar / xxbar;
        Double svar0 = svar/n + xbar*xbar*svar1;
        svar0 = svar * sumx2 / (n * xxbar);

        return new Double[]{beta0, beta1};
    }

    private List<List<Tracer>> clusterTracers(List<Tracer> tracers, Integer numberOfClusters, Integer numberOfIterations) {
        List<List<Tracer>> clusters = new ArrayList<List<Tracer>>();
        List<List<Double>> pivots = new ArrayList<List<Double>>();

        if(tracers.size() > 0) {
            for(int numberOfCluster = 0; numberOfCluster < numberOfClusters; numberOfCluster++){
                List<Double> measures = new ArrayList<>();
                measures.add((double) numberOfCluster+1);
                measures.add((double) numberOfCluster+1);
                pivots.add(measures);
            }

            for(int numberOfCluster = 0; numberOfCluster < numberOfClusters; numberOfCluster++) {
                clusters.add(new ArrayList<>());
            }

            for (Tracer tracer : tracers) {
                Integer pivotMinorDistanceIndex = 0;
                Double minorDistance = 10000d;

                for (List<Double> pivot : pivots) {
                    Double distance = this.getDistanceBetweenTracerMeasures(pivot, getTracerMeasures(tracer));
                    if (distance < minorDistance) {
                        pivotMinorDistanceIndex = pivots.indexOf(pivot);
                        minorDistance = distance;
                    }
                }

                clusters.get(pivotMinorDistanceIndex).add(tracer);
            }

            for (int i = 0; i < numberOfIterations; i++) {
                for (List<Tracer> cluster : clusters) {
                    if(cluster.size()>0)
                        pivots.set(clusters.indexOf(cluster), getTracersMediaMeasures(cluster));
                }

                clusters = new ArrayList<List<Tracer>>();
                for(int numberOfCluster = 0; numberOfCluster < numberOfClusters; numberOfCluster++) {
                    clusters.add(new ArrayList<>());
                }

                for (Tracer tracer : tracers) {
                    Integer pivotMinorDistanceIndex = 0;
                    Double minorDistance = 10000d;

                    for (List<Double> pivot : pivots) {
                        Double distance = this.getDistanceBetweenTracerMeasures(pivot, getTracerMeasures(tracer));
                        if (distance < minorDistance) {
                            pivotMinorDistanceIndex = pivots.indexOf(pivot);
                            minorDistance = distance;
                        }
                    }

                    clusters.get(pivotMinorDistanceIndex).add(tracer);
                }
            }
        }

        return clusters;
    }

    private List<Double> getTracerMeasures(Tracer tracer){
        List<Double> measures = new ArrayList<>();
        Double measure = 1.0;
        for(SupplyTypeAttrValue supplyTypeAttrValue : tracer.getSupplyTypeAttrValues()) {
            measure *= Double.parseDouble(supplyTypeAttrValue.getValue());
        }
        measures.add(measure);
        measures.add(new Double(tracer.getTime()) / 60);

        return measures;
    }

    private Double getDistanceBetweenTracerMeasures(List<Double> measureTracerA, List<Double> measureTracerB){
        return Math.sqrt(Math.pow((measureTracerB.get(0) - measureTracerA.get(0)),2) + Math.pow(measureTracerB.get(1) - measureTracerA.get(1),2));
    }

    private List<Double> getTracersMediaMeasures(List<Tracer> tracers){
        /*
        Collections.sort(tracers, new Comparator<Tracer>() {
            @Override
            public int compare(Tracer tracerA, Tracer tracerB) {
                List<Double> tracerMeasuresA = getTracerMeasures(tracerA);
                List<Double> tracerMeasuresB = getTracerMeasures(tracerB);
                return tracerMeasuresA.get(0) > tracerMeasuresB.get(0) ? -1 : (tracerMeasuresA.get(0) < tracerMeasuresB.get(0)) ? 1 : 0;
            }
        });

        Tracer mediaTracer = tracers.get((int) Math.floor(tracers.size()/2));
        */
        List<Double> mediaMeasures = new ArrayList<Double>();
        mediaMeasures.add(0d);
        mediaMeasures.add(0d);

        for(Tracer tracer : tracers){
            List<Double> tracerMeasures = getTracerMeasures(tracer);
            mediaMeasures.set(0, mediaMeasures.get(0) + tracerMeasures.get(0));
            mediaMeasures.set(1, mediaMeasures.get(1) + tracerMeasures.get(1));
        }

        mediaMeasures.set(0, mediaMeasures.get(0) / tracers.size());
        mediaMeasures.set(1, mediaMeasures.get(1) / tracers.size());

        return mediaMeasures;
    }
}
