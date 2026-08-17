import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewAssessmentPage } from './pages/NewAssessmentPage';
import { AssessmentResultPage } from './pages/AssessmentResultPage';
import { TraditionalGisPage } from './pages/TraditionalGisPage';
import { IksKnowledgePage } from './pages/IksKnowledgePage';
import { CommunityPage } from './pages/CommunityPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { Role } from './types';

export const App: React.FC = () => {
  const currentRole = (localStorage.getItem('hydro_role') as Role) || 'CITIZEN';

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
        <Navbar userRole={currentRole} />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/assessment/new" element={<NewAssessmentPage />} />
            <Route path="/assessment/:id" element={<AssessmentResultPage />} />
            <Route path="/gis-map" element={<TraditionalGisPage />} />
            <Route path="/iks-hub" element={<IksKnowledgePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
