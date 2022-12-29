package com.nanum.nadoo.Service;

import java.util.Map;

public interface NadooService {
    public Map<String, Object> getRecentTrades();
    public Map<String, Object> getCloserTrades();
}
