package com.todotresde.mms.service;

import com.todotresde.mms.domain.*;
import com.todotresde.mms.repository.LinearRegressionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

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

    public LinearRegressionService(WorkStationConfigService workStationConfigService, TracerService tracerService, LinearRegressionRepository linearRegressionRepository) {
        this.linearRegressionRepository = linearRegressionRepository;
        this.workStationConfigService = workStationConfigService;
        this.tracerService = tracerService;
    }

    public void generate() {
        this.linearRegressionRepository.deleteAll();
        List<WorkStationConfig> workStationConfigs = this.workStationConfigService.findAll();
        for(WorkStationConfig workStationConfig : workStationConfigs) {
            for(Employee employee : workStationConfig.getEmployees()) {
                for(SupplyType supplyType : workStationConfig.getSupplyTypes()) {
                    List<Tracer> tracers = this.tracerService.getTracersForWorkStationAndEmployeeAndSupplyType(workStationConfig.getWorkStation(), employee, supplyType);

                    Double[] betas = this.generateLinearRegression(tracers);
                    Double x = this.executeLinearRegression(1.0, betas);

                    LinearRegression linearRegression = new LinearRegression();
                    linearRegression.setBeta0(betas[0]);
                    linearRegression.setBeta1(betas[1]);
                    linearRegression.setX(x);
                    linearRegression.setDimension(1);
                    linearRegression.setLine(workStationConfig.getLine());
                    linearRegression.setWorkStationConfig(workStationConfig);
                    linearRegression.setWorkStation(workStationConfig.getWorkStation());
                    linearRegression.setSupply(null);
                    linearRegression.setSupplyType(supplyType);
                    linearRegression.setEmployee(employee);

                    this.linearRegressionRepository.save(linearRegression);
                }
            }
        }
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
            y[n] = new Double(tracer.getTime()) / 2;
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
        Double beta1 = xybar / xxbar;
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
        /*
        StdOut.println("R^2                 = " + R2);
        StdOut.println("std error of beta_1 = " + Math.sqrt(svar1));
        StdOut.println("std error of beta_0 = " + Math.sqrt(svar0));
        StdOut.println("std error of beta_0 = " + Math.sqrt(svar0));

        StdOut.println("SSTO = " + yybar);
        StdOut.println("SSE  = " + rss);
        StdOut.println("SSR  = " + ssr);
        */

        return new Double[]{beta0, beta1};
    }
}
