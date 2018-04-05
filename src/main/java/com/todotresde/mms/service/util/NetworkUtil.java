package com.todotresde.mms.service.util;

import java.util.regex.Pattern;

/**
 * Utility class for network.
 */
public final class NetworkUtil {

    private NetworkUtil() {
    }

    private static final Pattern PATTERN = Pattern.compile(
        "^(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.){3}([01]?\\d\\d?|2[0-4]\\d|25[0-5])$");

    /**
     * Validate IP.
     *
     * @return boolean
     */
    public static boolean validate(final String ip) {
        return PATTERN.matcher(ip).matches();
    }
}
