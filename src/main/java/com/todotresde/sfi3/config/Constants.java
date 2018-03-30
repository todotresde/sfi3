package com.todotresde.sfi3.config;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^[_'.@A-Za-z0-9-]*$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";
    public static final String DEFAULT_LANGUAGE = "en";

    public static final Integer STATUS_CREATED = 0;
    public static final Integer STATUS_STARTED = 1;
    public static final Integer STATUS_INPROGRESS = 2;
    public static final Integer STATUS_FINISHED = 3;
    public static final Integer STATUS_CANCELED = 4;

    private Constants() {
    }
}
