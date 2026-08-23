// Ye file Candidate ka main dashboard hai.
// Yaha par user apni summary, recent interviews, aur progress dekh sakta hai.
// Abhi dashboard par temporary static data use kar rahe hain.
// Real data baad mein backend API se aayega.

import React from 'react';
import CandidateLayout from '../../layouts/CandidateLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { PlayCircle, CheckCircle, TrendingUp, Star, Lightbulb } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

// Temporary static data
const recentInterviews = [
  { id: 1, domain: "Frontend Architecture", date: "Today, 10:00 AM", score: 92, difficulty: "Hard", topic: "React" },
  { id: 2, domain: "Behavioral: Leadership", date: "Oct 24, 2:30 PM", score: 88, difficulty: "Medium", topic: "Management" },
  { id: 3, domain: "Data Structures", date: "Oct 20, 11:15 AM", score: 76, difficulty: "Medium", topic: "Algorithms" }
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <CandidateLayout>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="dashBadaTitle">Good morning, Alex</h1>
          <p className="dashChhotaText">Ready for your next interview?</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center gap-2"
          onClick={() => navigate('/interview/setup')}
        >
          <PlayCircle size={20} />
          Start New Interview
        </Button>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        <Card className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-4">
            <span className="statTitle">Interviews Completed</span>
            <div className="primary-gradient-bg p-2 rounded-lg">
              {/* Blue box ke andar icon white rakha hai taaki clearly dikhe. */}
              <CheckCircle size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="statNumber">12</span>
            <span className="text-sm text-[var(--color-secondary-text)]">this month</span>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-4">
            <span className="statTitle">Average Score</span>
            <div className="primary-gradient-bg p-2 rounded-lg">
              {/* Blue box ke andar icon white rakha hai taaki clearly dikhe. */}
              <TrendingUp size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="statNumber">84<span className="text-xl">%</span></span>
            <span className="text-sm text-green-800 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +5%
            </span>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-full hover:border-[var(--color-primary-light)] transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">Best Score</span>
            <div className="primary-gradient-bg p-2 rounded-lg">
              {/* Blue box ke andar icon white rakha hai taaki clearly dikhe. */}
              <Star size={20} className="text-white" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[var(--color-primary)]">96<span className="text-xl">%</span></span>
            <span className="text-sm text-[var(--color-secondary-text)]">System Design</span>
          </div>
        </Card>

      </section>

      {/* Main Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Chart & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="tableTitle mb-6">Performance Trend</h2>
            <div className="h-[250px] w-full bg-[var(--color-background)] rounded border border-[var(--color-border)] flex items-center justify-center">
              {/* Fake Chart Placeholder. Actual chart implementation belongs to a later phase */}
              <span className="text-[var(--color-secondary-text)] text-sm italic">Chart visualization will appear here</span>
            </div>
          </Card>
          
          {/* Quick Feedback Snippet */}
          <div className="bg-[#f5f3ff] border border-[var(--color-primary-light)] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={20} className="text-[var(--color-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--color-primary)]">AI Insight</h3>
            </div>
            <p className="text-base text-[var(--color-primary-text)]">
              Your communication clarity has improved significantly over the last 3 sessions. Focus on elaborating edge cases in technical questions to boost your overall score.
            </p>
          </div>
        </div>

        {/* Right Col: Recent Interviews List */}
        <div className="lg:col-span-1 tableDabba h-[500px]">
          <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-background)] rounded-t-xl">
            <h2 className="tableTitle">Recent Interviews</h2>
            <button className="text-[var(--color-primary)] hover:bg-[var(--color-surface)] p-2 rounded transition-colors text-sm font-semibold">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {recentInterviews.map((interview) => (
              <div key={interview.id} className="group border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-primary-light)] hover:bg-[var(--color-background)] transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-primary-text)] group-hover:text-[var(--color-primary)] transition-colors">{interview.domain}</h3>
                    <span className="text-sm text-[var(--color-secondary-text)]">{interview.date}</span>
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full border ${
                    interview.score >= 90 ? 'bg-green-50 text-green-700 border-green-200' : 
                    interview.score >= 80 ? 'bg-gray-100 text-gray-800 border-gray-200' : 
                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }`}>
                    {interview.score}%
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="bg-[var(--color-background)] text-[var(--color-secondary-text)] text-xs font-semibold px-2 py-1 rounded">
                    {interview.difficulty}
                  </span>
                  <span className="bg-[var(--color-background)] text-[var(--color-secondary-text)] text-xs font-semibold px-2 py-1 rounded">
                    {interview.topic}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </CandidateLayout>
  );
};

export default DashboardPage;
