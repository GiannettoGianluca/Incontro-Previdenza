import { SurveyResponse, Booking } from '../types';

// Changed keys to 'v2' to force a reset of the data for the user
const STORAGE_KEYS = {
  SURVEYS: 'sabelli_surveys_v2',
  BOOKINGS: 'sabelli_bookings_v2',
};

export const dataService = {
  getSurveys: (): SurveyResponse[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SURVEYS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to parse surveys", e);
      return [];
    }
  },

  saveSurvey: (survey: SurveyResponse) => {
    const surveys = dataService.getSurveys();
    surveys.unshift(survey); // Add to beginning
    localStorage.setItem(STORAGE_KEYS.SURVEYS, JSON.stringify(surveys));
  },

  getBookings: (): Booking[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to parse bookings", e);
      return [];
    }
  },

  saveBooking: (booking: Booking) => {
    const bookings = dataService.getBookings();
    bookings.unshift(booking); // Add to beginning
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },
  
  // No longer generates mock data, ensuring a clean slate for testing
  initializeDemoData: () => {
    // Check if storage exists, if not initialize with empty arrays
    if (!localStorage.getItem(STORAGE_KEYS.SURVEYS)) {
      localStorage.setItem(STORAGE_KEYS.SURVEYS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
    }
  }
};