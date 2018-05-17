package com.todotresde.mms.service.util;

import com.todotresde.mms.domain.SupplyTypeAttrValue;
import com.todotresde.mms.domain.Tracer;

import java.util.List;

public final class LinearRegression {

    private LinearRegression() {
    }

    public static Double executeLinearRegression(Double x, Double[] betas) {
        //y =  beta1 * x + beta0
        return betas[1] * x + betas[0];
    }

    public static Double[] generateLinearRegression(List<Tracer> tracers) {
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
