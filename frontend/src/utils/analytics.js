// PostHog Analytics Utility
// Tracks user interactions with FlipWill

/**
 * Track an event to PostHog
 * @param {string} eventName - Name of the event
 * @param {object} properties - Additional properties to track
 */
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
    console.log(`[PostHog] Tracked: ${eventName}`, properties);
  } else {
    console.warn(`[PostHog] Not available, event not tracked: ${eventName}`);
  }
};

/**
 * Identify a user in PostHog
 * @param {string} userId - Unique user identifier
 * @param {object} traits - User traits/properties
 */
export const identifyUser = (userId, traits = {}) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.identify(userId, traits);
    console.log(`[PostHog] Identified user: ${userId}`);
  }
};

// Pre-defined event names for consistency
export const EVENTS = {
  READING_STARTED: 'reading_started',
  SPREAD_COMPLETED: 'spread_completed',
  CLARITY_CLICKED: 'clarity_clicked',
  CHECKOUT_STARTED: 'checkout_started',
  PAYMENT_SUCCESS: 'payment_success',
};

export default { trackEvent, identifyUser, EVENTS };
