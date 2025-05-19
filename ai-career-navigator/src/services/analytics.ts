// Simple analytics service - in production, you would use actual analytics service

type EventType = 'page_view' | 'conversion' | 'form_submit' | 'button_click' | 'payment';

const trackEvent = (eventType: EventType, properties: Record<string, any> = {}) => {
  // In production, this would send data to your analytics service
  console.log(`ANALYTICS EVENT: ${eventType}`, properties);
  
  // Mock sending to a server
  if (process.env.NODE_ENV === 'production') {
    try {
      // This would be an API call to your analytics service
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventType, properties, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
};

const trackPageView = (pageName: string, properties: Record<string, any> = {}) => {
  trackEvent('page_view', { pageName, ...properties });
};

const trackConversion = (stepName: string, properties: Record<string, any> = {}) => {
  trackEvent('conversion', { stepName, ...properties });
};

const trackFormSubmit = (formName: string, properties: Record<string, any> = {}) => {
  trackEvent('form_submit', { formName, ...properties });
};

const trackButtonClick = (buttonName: string, properties: Record<string, any> = {}) => {
  trackEvent('button_click', { buttonName, ...properties });
};

const trackPayment = (amount: number, properties: Record<string, any> = {}) => {
  trackEvent('payment', { amount, ...properties });
};

export const analytics = {
  trackEvent,
  trackPageView,
  trackConversion,
  trackFormSubmit,
  trackButtonClick,
  trackPayment,
};