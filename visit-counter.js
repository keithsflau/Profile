/**
 * Visit Counter Module v2.0 - Google Sheets Backend
 * Tracks and displays page visit counts using Google Sheets for persistent storage
 * 
 * Usage:
 *   <script src="visit-counter.js"></script>
 *   <script>
 *     VisitCounter.init('mathematics-portal', {
 *       scriptUrl: 'YOUR_GOOGLE_APPS_SCRIPT_URL',
 *       containerId: 'visit-counter-container',
 *       showChart: true
 *     });
 *   </script>
 */

const VisitCounter = (function () {
    'use strict';

    // Configuration
    let CONFIG = {
        SCRIPT_URL: '', // Will be set during init
        FALLBACK_TO_LOCALSTORAGE: true,
        SESSION_BASED_TRACKING: true,
        CACHE_DURATION_MS: 5 * 60 * 1000, // 5 minutes
        RETRY_ATTEMPTS: 3,
        RETRY_DELAY_MS: 1000
    };

    /**
     * Generate or retrieve visitor ID
     */
    function getVisitorId() {
        let visitorId = localStorage.getItem('portal_visitor_id');

        if (!visitorId) {
            // Create fingerprint-based ID (not PII)
            const fingerprint = [
                navigator.userAgent,
                navigator.language,
                screen.width + 'x' + screen.height,
                new Date().getTimezoneOffset()
            ].join('|');

            visitorId = hashCode(fingerprint).toString(36);
            localStorage.setItem('portal_visitor_id', visitorId);
        }

        return visitorId;
    }

    /**
     * Generate session ID
     */
    function getSessionId() {
        let sessionId = sessionStorage.getItem('portal_session_id');

        if (!sessionId) {
            sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            sessionStorage.setItem('portal_session_id', sessionId);
        }

        return sessionId;
    }

    /**
     * Simple hash function
     */
    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    /**
     * Check if visit was already recorded this session
     */
    function isVisitRecorded(pageId) {
        const key = `visit_recorded_${pageId}`;
        return sessionStorage.getItem(key) === 'true';
    }

    /**
     * Mark visit as recorded for this session
     */
    function markVisitRecorded(pageId) {
        const key = `visit_recorded_${pageId}`;
        sessionStorage.setItem(key, 'true');
    }

    /**
     * Record visit to Google Sheets
     */
    async function recordVisit(pageId) {
        // Check if already recorded this session
        if (CONFIG.SESSION_BASED_TRACKING && isVisitRecorded(pageId)) {
            console.log('Visit already recorded this session');
            return await getCachedCount(pageId);
        }

        const visitData = {
            timestamp: new Date().toISOString(),
            portal: pageId,
            visitorId: getVisitorId(),
            sessionId: getSessionId(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct'
        };

        try {
            // Try to send to Google Sheets
            const response = await fetchWithRetry(CONFIG.SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(visitData),
                mode: 'cors'
            });

            const data = await response.json();

            if (data.success) {
                markVisitRecorded(pageId);
                cacheCount(pageId, data.count, data.todayCount);
                return data;
            } else {
                throw new Error(data.error || 'Failed to record visit');
            }

        } catch (error) {
            console.warn('Failed to record visit to Google Sheets:', error);

            // Fallback to localStorage
            if (CONFIG.FALLBACK_TO_LOCALSTORAGE) {
                return recordVisitLocal(pageId);
            }

            throw error;
        }
    }

    /**
     * Fetch with retry logic
     */
    async function fetchWithRetry(url, options, attempts = CONFIG.RETRY_ATTEMPTS) {
        for (let i = 0; i < attempts; i++) {
            try {
                const response = await fetch(url, options);
                if (response.ok) return response;

                if (i === attempts - 1) throw new Error(`HTTP ${response.status}`);

            } catch (error) {
                if (i === attempts - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY_MS * (i + 1)));
            }
        }
    }

    /**
     * Fallback: Record visit locally
     */
    function recordVisitLocal(pageId) {
        const key = `visit_count_${pageId}`;
        const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
        localStorage.setItem(key, count.toString());

        markVisitRecorded(pageId);

        return {
            count: count,
            todayCount: count,
            fallback: true
        };
    }

    /**
     * Cache visit count
     */
    function cacheCount(pageId, totalCount, todayCount) {
        const cacheData = {
            totalCount,
            todayCount,
            timestamp: Date.now()
        };
        sessionStorage.setItem(`cache_${pageId}`, JSON.stringify(cacheData));
    }

    /**
     * Get cached count
     */
    async function getCachedCount(pageId) {
        const cached = sessionStorage.getItem(`cache_${pageId}`);

        if (cached) {
            const data = JSON.parse(cached);
            if (Date.now() - data.timestamp < CONFIG.CACHE_DURATION_MS) {
                return {
                    count: data.totalCount,
                    todayCount: data.todayCount,
                    cached: true
                };
            }
        }

        // If no valid cache, fetch from server
        try {
            const response = await fetch(`${CONFIG.SCRIPT_URL}?portal=${pageId}`);
            const result = await response.json();

            if (result.success) {
                cacheCount(pageId, result.data.totalVisits, result.data.todayVisits);
                return {
                    count: result.data.totalVisits,
                    todayCount: result.data.todayVisits
                };
            }
        } catch (error) {
            console.warn('Failed to fetch count:', error);
        }

        // Fallback to localStorage
        const key = `visit_count_${pageId}`;
        const count = parseInt(localStorage.getItem(key) || '0', 10);
        return { count, todayCount: count, fallback: true };
    }

    /**
     * Create badge element
     */
    function createBadge(count, todayCount, isFallback) {
        const badge = document.createElement('div');
        badge.className = 'visit-counter-badge';

        const fallbackIndicator = isFallback ? ' <span style="opacity: 0.5;">(offline)</span>' : '';

        badge.innerHTML = `
      <div style="
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15));
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 12px;
        backdrop-filter: blur(10px);
        min-width: 200px;
      ">
        <div style="display: flex; align-items: center; gap: 8px; width: 100%;">
          <svg width="20" height="20" fill="#3b82f6" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          <div style="flex: 1;">
            <div style="font-size: 0.75rem; color: #64748b; font-weight: 500;">總訪問次數</div>
            <div style="font-size: 1.5rem; color: #3b82f6; font-weight: 700;">${count.toLocaleString()}${fallbackIndicator}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; width: 100%; padding-top: 8px; border-top: 1px solid rgba(59, 130, 246, 0.2);">
          <svg width="16" height="16" fill="#10b981" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
          </svg>
          <div style="flex: 1;">
            <div style="font-size: 0.7rem; color: #64748b; font-weight: 500;">今日訪問</div>
            <div style="font-size: 1.125rem; color: #10b981; font-weight: 600;">${todayCount.toLocaleString()}</div>
          </div>
        </div>
      </div>
    `;

        return badge;
    }

    /**
     * Display visit counter
     */
    async function displayCounter(pageId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container #${containerId} not found`);
            return;
        }

        // Show loading state
        container.innerHTML = '<div style="color: #64748b;">載入中...</div>';

        try {
            const result = await recordVisit(pageId);
            const badge = createBadge(
                result.count || 0,
                result.todayCount || 0,
                result.fallback || false
            );

            container.innerHTML = '';
            container.appendChild(badge);

        } catch (error) {
            console.error('Failed to display counter:', error);
            container.innerHTML = '<div style="color: #ef4444; font-size: 0.875rem;">無法載入訪問計數</div>';
        }
    }

    /**
     * Initialize visit counter
     */
    function init(pageId, options = {}) {
        if (!pageId) {
            console.error('VisitCounter: pageId is required');
            return;
        }

        // Update configuration
        CONFIG.SCRIPT_URL = options.scriptUrl || CONFIG.SCRIPT_URL;
        if (!CONFIG.SCRIPT_URL) {
            console.error('VisitCounter: scriptUrl is required');
            return;
        }

        const containerId = options.containerId || 'visit-counter-container';

        // Wait for DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                displayCounter(pageId, containerId);
            });
        } else {
            displayCounter(pageId, containerId);
        }
    }

    // Public API
    return {
        init
    };
})();
