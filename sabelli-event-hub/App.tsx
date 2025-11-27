import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { SurveyForm } from './components/SurveyForm';
import { BookingSystem } from './components/BookingSystem';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { ViewState } from './types';
import { CheckCircle } from 'lucide-react';
import { dataService } from './services/dataService';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');

  useEffect(() => {
    // Initialize demo data so the admin panel isn't empty on first load
    dataService.initializeDemoData();
  }, []);

  // Success screen component for reuse
  const SuccessScreen = ({ title, message, onHome }: { title: string, message: string, onHome: () => void }) => (
    <div className="max-w-md mx-auto mt-20 px-6 py-12 bg-white rounded-2xl shadow-xl text-center animate-fade-in">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={40} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-8">{message}</p>
      <button 
        onClick={onHome}
        className="text-blue-600 hover:text-blue-800 font-semibold underline"
      >
        Torna alla Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Clicking Header 'Area Riservata' now goes to 'admin-login' first */}
      <Header onAdminClick={() => setView('admin-login')} />
      
      <main className="flex-grow">
        {view === 'landing' && (
          <LandingPage 
            onStartSurvey={() => setView('survey')} 
            onStartBooking={() => setView('booking')} 
          />
        )}

        {view === 'survey' && (
          <SurveyForm 
            onComplete={() => setView('confirmed')}
            onCancel={() => setView('landing')}
          />
        )}

        {view === 'booking' && (
          <BookingSystem 
            onComplete={() => setView('confirmed')}
            onCancel={() => setView('landing')}
          />
        )}

        {view === 'confirmed' && (
          <SuccessScreen 
            title="Tutto confermato!" 
            message="Grazie per il tuo tempo. Abbiamo registrato la tua richiesta con successo."
            onHome={() => setView('landing')}
          />
        )}

        {view === 'admin-login' && (
          <AdminLogin 
            onSuccess={() => setView('admin')}
            onCancel={() => setView('landing')}
          />
        )}

        {view === 'admin' && (
          <AdminDashboard onExit={() => setView('landing')} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Sabelli Consulenti Assicurativi | Generali Italia S.p.A.</p>
        <p className="mt-1">Via Filippo Turati 10</p>
      </footer>
    </div>
  );
}