import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/common/Button';
import { PlayCircle } from 'lucide-react';

const DashboardHeader = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default DashboardHeader;
