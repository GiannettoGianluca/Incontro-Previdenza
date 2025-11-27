import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Mail, MousePointer, Sparkles, Table, Calendar, Download } from 'lucide-react';
import { analyzeFeedback } from '../services/geminiService';
import { SurveyResponse, Booking } from '../types';
import { dataService } from '../services/dataService';

interface AdminDashboardProps {
  onExit: () => void;
}

const COLORS = ['#15803d', '#16a34a', '#fbbf24', '#dc2626'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load real data from service
    setSurveys(dataService.getSurveys());
    setBookings(dataService.getBookings());
  }, []);

  const handleGenerateAnalysis = async () => {
    setLoadingAi(true);
    const analysis = await analyzeFeedback(surveys);
    setAiAnalysis(analysis);
    setLoadingAi(false);
  };

  const downloadCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    
    // Get headers
    const headers = Object.keys(data[0]).join(',');
    // Format rows
    const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate stats from real data
  const totalSurveys = surveys.length;
  const totalBookings = bookings.length;
  
  // Create chart data dynamically
  const ratingsCount = [0, 0, 0, 0, 0, 0]; // Index 1-5
  surveys.forEach(s => {
    if (s.rating >= 1 && s.rating <= 5) ratingsCount[s.rating]++;
  });

  const surveyChartData = [
    { name: '5 Stelle', value: ratingsCount[5] },
    { name: '4 Stelle', value: ratingsCount[4] },
    { name: '3 Stelle', value: ratingsCount[3] },
    { name: '1-2 Stelle', value: ratingsCount[1] + ratingsCount[2] },
  ].filter(d => d.value > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Evento "Aperitivo"</h1>
          <p className="text-gray-500">Analisi performance email e feedback in tempo reale</p>
        </div>
        <div className="flex gap-4">
            <div className="flex gap-2">
                 <button 
                    onClick={() => downloadCSV(surveys, 'sondaggi_sabelli.csv')}
                    disabled={surveys.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
                 >
                    <Download size={16} /> Export Sondaggi
                 </button>
                 <button 
                    onClick={() => downloadCSV(bookings, 'prenotazioni_sabelli.csv')}
                    disabled={bookings.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                 >
                    <Download size={16} /> Export Prenotazioni
                 </button>
            </div>
            <button onClick={onExit} className="text-sm text-red-600 hover:underline px-4">Esci</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Mail /></div>
            <div>
              <p className="text-sm text-gray-500">Email Inviate</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><MousePointer /></div>
            <div>
              <p className="text-sm text-gray-500">Click Totali</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Users /></div>
            <div>
              <p className="text-sm text-gray-500">Sondaggi Completati</p>
              <p className="text-2xl font-bold text-green-600">{totalSurveys}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-lg"><Sparkles /></div>
            <div>
              <p className="text-sm text-gray-500">Appuntamenti</p>
              <p className="text-2xl font-bold text-red-600">{totalBookings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-bold mb-6">Soddisfazione Evento</h3>
          {surveyChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={surveyChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {surveyChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-64 flex items-center justify-center text-gray-400">Nessun dato disponibile</div>
          )}
        </div>

        {/* Gemini Analysis Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="text-purple-500" size={20} />
              Analisi AI Gemini
            </h3>
            <button
              onClick={handleGenerateAnalysis}
              disabled={loadingAi || surveys.length === 0}
              className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
            >
              {loadingAi ? 'Analisi in corso...' : 'Analizza Feedback'}
            </button>
          </div>
          
          <div className="flex-grow bg-gray-50 rounded-lg p-6 overflow-y-auto max-h-[300px]">
            {aiAnalysis ? (
              <div className="prose prose-sm prose-purple">
                <div dangerouslySetInnerHTML={{ __html: aiAnalysis.replace(/\n/g, '<br />') }} />
              </div>
            ) : (
              <div className="text-center text-gray-400 h-full flex flex-col justify-center items-center">
                <p>Clicca "Analizza Feedback" per generare un riassunto dei commenti qualitativi usando Google Gemini.</p>
                {surveys.length === 0 && <p className="text-xs mt-2 text-red-400">Nessun sondaggio da analizzare.</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Tables Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Dettaglio Dati Raccolti</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Survey Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 font-semibold text-gray-700">
            <Table size={18} />
            Ultimi Sondaggi
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Interesse</th>
                  <th className="px-6 py-3">Commento</th>
                </tr>
              </thead>
              <tbody>
                {surveys.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center text-gray-500">Nessun sondaggio ricevuto</td></tr>
                ) : (
                  surveys.map((s) => (
                    <tr key={s.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {new Date(s.submittedAt).toLocaleDateString('it-IT')}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-1">
                          {s.rating}<span className="text-yellow-500">★</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{s.interestTopic}</td>
                      <td className="px-6 py-4 text-gray-500 truncate max-w-xs" title={s.comment}>
                        {s.comment || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bookings Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 font-semibold text-gray-700">
            <Calendar size={18} />
            Prenotazioni Confermate
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Data Evento</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Contatti</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan={3} className="p-4 text-center text-gray-500">Nessuna prenotazione</td></tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                         {new Date(b.date).toLocaleDateString('it-IT')} <span className="text-gray-500 text-xs ml-1">{b.time}</span>
                      </td>
                      <td className="px-6 py-4">{b.name}</td>
                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold">{b.email}</span>
                          <span>{b.phone}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};