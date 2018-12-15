package com.todotresde.mms.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.todotresde.mms.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.todotresde.mms.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Employee.class.getName() + ".workStationConfigs", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Line.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Line.class.getName() + ".workStationConfigs", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.WorkStationConfig.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.WorkStationConfig.class.getName() + ".supplyTypes", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.WorkStationConfig.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.WorkStationConfig.class.getName() + ".prevWorkStations", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.WorkStationConfig.class.getName() + ".nextWorkStations", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.WorkStation.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.WorkStation.class.getName() + ".prevWorkStationConfigs", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.WorkStation.class.getName() + ".nextWorkStationConfigs", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.ManufacturingOrder.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Supply.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Supply.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.SupplyType.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.SupplyType.class.getName() + ".supplies", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.SupplyType.class.getName() + ".supplyTypeAttrs", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.SupplyType.class.getName() + ".workStationConfigs", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.SupplyTypeAttr.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.SupplyTypeAttr.class.getName() + ".supplyTypes", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.SupplyTypeAttrValue.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.SupplyTypeAttrValue.class.getName() + ".tracers", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Product.class.getName() + ".supplies", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Tracer.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.Tracer.class.getName() + ".supplyTypeAttrValues", jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.LinearRegression.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.mms.domain.LinearRegression.class.getName() + ".tracers", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
