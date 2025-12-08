/**
 * Visit Counter for Static Sites
 * - Uses Google Sheets as backend
 * - Local caching with sessionStorage
 * - Robust error handling
 */
const VisitCounter = (function () {

    // Configuration
    const CONFIG = {
        SCRIPT_URL: 'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',
        CACHE_DURATION_MS: 30 * 60 * 1000, // 30 minutes
        RETRY_ATTEMPTS: 2,
        RETRY_DELAY_MS: 1000,
        FALLBACK_TO_LOCALSTORAGE: true
    };

    /**
     * Generate or retrieve a persistent Visitor ID
     */
    function getVisitorId() {
        let vid = localStorage.getItem('vc_visitor_id');
        if (!vid) {
            vid = 'v_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
            localStorage.setItem('vc_visitor_id', vid);
        }
        return vid;
    }

    /**
     * Generate session ID
     */
    function getSessionId() {
        let sid = sessionStorage.getItem('vc_session_id');
        if (!sid) {
            sid = 's_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
            sessionStorage.setItem('vc_session_id', sid);
        }
        return sid;
    }

    /**
     * Mark visit as recorded locally to prevent duplicate counts on reload
     */
    function isVisitRecorded(pageId) {
        const lastVisit = sessionStorage.getItem(`vc_recorded_${pageId}`);
        if (!lastVisit) return false;

        // Check if within same session timeframe (e.g. 30 mins)
        // For simplicity, we trust session storage which clears on browser close
        return true;
    }

    function markVisitRecorded(pageId) {
        sessionStorage.setItem(`vc_recorded_${pageId}`, Date.now().toString());
    }

    /**
     * Main record visit function
     */
    async function recordVisit(pageId) {
        // First check cache/session to avoid spamming API on refresh
        if (isVisitRecorded(pageId)) {
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
                    'Content-Type': 'text/plain;charset=utf-8', // Changed to text/plain to avoid CORS preflight issues with simple requests sometimes
                },
                body: JSON.stringify(visitData)
            });

            const data = await response.json();

            if (data.success) {
                markVisitRecorded(pageId);
                cacheCount(pageId, data.data.totalVisits, data.data.todayVisits);
                return {
                    count: data.data.totalVisits,
                    todayCount: data.data.todayVisits,
                    cached: false
                };
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
            todayCount: count, // Local storage doesn't easy track daily without more logic, simplified here
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

        // If no valid cache, fetch from server (read-only)
        try {
            const response = await fetch(`${CONFIG.SCRIPT_URL}?portal=${pageId}`);
            const result = await response.json();

            if (result.success) {
                cacheCount(pageId, result.data.totalVisits, result.data.todayVisits);
                return {
                    count: result.data.totalVisits,
                    todayCount: result.data.todayVisits,
                    cached: false
                };
            }
        } catch (error) {
            console.warn('Failed to fetch from server', error);
        }

        return null;
    }

    /**
     * Display the counter
     */
    async function displayCounter(pageId, containerId = 'visit-counter-container') {
        const container = document.getElementById(containerId);
        if (!container) return; // Silent fail if no container

        // Add class for styling if not present
        container.classList.add('visit-counter-container');

        // Initial state
        container.innerHTML = `
            <div class="visit-counter-badge loading">
                <span class="icon">📊</span>
                <span class="text">讀取中...</span>
            </div>
        `;

        try {
            // Record visit and get data
            const data = await recordVisit(pageId);

            if (data) {
                container.innerHTML = `
                    <div class="visit-counter-badge success">
                        <span class="icon">✅</span>
                        <div class="stats">
                            <span class="total" title="總訪問量: ${data.count}">總: ${formatNumber(data.count)}</span>
                            <span class="separator">|</span>
                            <span class="today" title="今日訪問: ${data.todayCount}">日: ${formatNumber(data.todayCount)}</span>
                        </div>
                    </div>
                `;
            } else {
                throw new Error('No data received');
            }

        } catch (error) {
            console.error('Visit Counter Error:', error);
            container.innerHTML = `
                <div class="visit-counter-badge error" title="無法連接伺服器">
                    <span class="icon">📴</span>
                    <span class="text">離線模式</span>
                </div>
            `;

            // Try to show local fallback if available
            const local = recordVisitLocal(pageId);
            if (local && local.count > 0) {
                container.innerHTML = `
                    <div class="visit-counter-badge warning">
                        <span class="icon">⚠️</span>
                        <div class="stats">
                            <span class="total">總: ${formatNumber(local.count)}</span>
                        </div>
                    </div>
                `;
            }
        }
    }

    /**
     * Helper to format numbers
     */
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Initialize
     */
    function init(pageId, options = {}) {
        if (!pageId) {
            console.error('VisitCounter: pageId is required');
            return;
        }

        // Update configuration
        if (options.scriptUrl) {
            CONFIG.SCRIPT_URL = options.scriptUrl;
        }

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
