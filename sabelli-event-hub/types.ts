export type ViewState = 'landing' | 'survey' | 'booking' | 'confirmed' | 'admin-login' | 'admin';

export interface SurveyResponse {
  id: string;
  rating: number; // 1-5
  interestTopic: string;
  futureInterest: boolean;
  comment?: string;
  submittedAt: string; // ISO String for storage compatibility
}

export interface BookingSlot {
  id: string;
  date: string; // ISO date
  time: string;
  available: boolean;
}

export interface Booking {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  submittedAt: string;
}

export interface AnalyticsData {
  totalSent: number;
  opened: number;
  clickedSurvey: number;
  clickedBooking: number;
  booked: number;
}