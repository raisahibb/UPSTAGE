import React from 'react';
import CandidateLayout from '../../../layouts/CandidateLayout';
import Card from '../../../components/common/Card';
import { TrendingUp, Award, Target, Zap } from 'lucide-react';
import { getInterviewProgress } from '../../../services/apiService';
const ProgressPage = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await getInterviewProgress();
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProgress();
  }, []);

  if (loading) {
    return (
      <CandidateLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Loading progress...</p>
        </div>
      </CandidateLayout>
    );
  }

  const hasEvaluated = data && data.evaluatedInterviews > 0;

  return (
    <CandidateLayout>
      <div className="mb-8">
        <h1 className="dashBadaTitle mb-2">Progress & Analytics</h1>
        <p className="dashChhotaText">Track your interview performance over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Overall Score', icon: Award, value: hasEvaluated ? `${data.averageScore}/10` : null },
          { title: 'Technical Accuracy', icon: Target, value: hasEvaluated ? `${data.categoryAverages.technicalAccuracy}/10` : null },
          { title: 'Communication Clarity', icon: Zap, value: hasEvaluated ? `${data.categoryAverages.clarity}/10` : null },
          { title: 'Evaluated Interviews', icon: TrendingUp, value: hasEvaluated ? data.evaluatedInterviews : null }
        ].map((stat, index) => (
          <Card key={index} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">{stat.title}</span>
              <div className="primary-gradient-bg p-2 rounded-lg">
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
            <div className="mt-2">
              {stat.value !== null ? (
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              ) : (
                <span className="text-sm font-semibold text-gray-400 italic">Not evaluated yet</span>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Trend Section */}
        <Card className="flex flex-col h-full min-h-[350px]">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Performance Trend</h2>
          {hasEvaluated && data.trend && data.trend.length >= 2 ? (
            <div className="flex-1 flex items-end justify-around w-full gap-2 relative pt-8 pb-4">
              {data.trend.slice(-10).map((t, idx) => {
                const heightPct = Math.max((t.score / 10) * 100, 5);
                const date = new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 group h-full justify-end">
                    <div className="text-xs font-bold text-[var(--color-primary)] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.score.toFixed(1)}
                    </div>
                    <div className="w-full max-w-[40px] bg-indigo-100 rounded-t-sm relative group-hover:bg-indigo-200 transition-colors" style={{ height: '200px' }}>
                      <div 
                        className="absolute bottom-0 w-full bg-[var(--color-primary)] rounded-t-sm transition-all"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-[var(--color-secondary-text)] mt-2 truncate w-full text-center">
                      {date}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <TrendingUp size={32} className="text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium text-sm">Complete more evaluated interviews to see your performance trend.</p>
            </div>
          )}
        </Card>

        {/* Strengths & Weaknesses */}
        <Card className="flex flex-col h-full">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Aggregate Insights</h2>
          {!hasEvaluated ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center">
               <p className="text-gray-500 font-medium text-sm">Evaluation data will appear here after your first evaluated interview.</p>
             </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-3">
                  <span className="bg-green-100 p-1 text-xs rounded">▲</span> Top Strengths
                </h3>
                {data.strengths?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">No consistent strengths identified yet.</p>
                )}
              </div>
              <div className="border-t pt-6">
                <h3 className="font-semibold text-amber-700 flex items-center gap-2 mb-3">
                  <span className="bg-amber-100 p-1 text-xs rounded">▼</span> Areas to Improve
                </h3>
                {data.weaknesses?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {data.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">No specific weaknesses identified yet.</p>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Domain Performance */}
      {hasEvaluated && data.domainPerformance?.length > 0 && (
        <Card>
          <h2 className="text-lg font-bold text-gray-800 mb-6">Domain Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.domainPerformance.map((dp, idx) => (
              <div key={idx} className="border border-gray-100 bg-gray-50/50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800">{dp.domain}</h3>
                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-gray-500">Interviews: <strong className="text-gray-700">{dp.count}</strong></span>
                  <span className="text-gray-500">Avg: <strong className="text-indigo-600">{dp.average}/10</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

    </CandidateLayout>
  );
};

export default ProgressPage;
