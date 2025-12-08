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
                    if(!pageId) {
                        console.error('VisitCounter: pageId is required');
                        return;
                    }

        // Update configuration
        CONFIG.SCRIPT_URL = options.scriptUrl || CONFIG.SCRIPT_URL;
                    if(!CONFIG.SCRIPT_URL) {
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
        }) ();
