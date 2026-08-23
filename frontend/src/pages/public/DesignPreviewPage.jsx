// Ye page Design System ko test karne ke liye banaya gaya hai.
// Isme sabhi reusable components ka preview dikhaya gaya hai.

import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import PublicLayout from '../../layouts/PublicLayout';

const DesignPreviewPage = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <PublicLayout>
      <div className="space-y-12 pb-24">
        
        {/* Header section */}
        <section className="border-b border-[var(--color-border)] pb-6">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">UPSTAGE Design System Preview</h1>
          <p className="text-[var(--color-secondary-text)] mt-2">
            Verifying typography, colors, spacing, and reusable components.
          </p>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-[var(--color-border)] pb-2">1. Typography</h2>
          <div className="space-y-4 bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <div>
              <span className="text-sm text-[var(--color-muted-text)] block mb-1">Display / Hero (36px, Bold)</span>
              <div className="text-[36px] font-bold leading-[1.2]">The quick brown fox jumps over the lazy dog</div>
            </div>
            <div>
              <span className="text-sm text-[var(--color-muted-text)] block mb-1">Page Heading (28px, Semibold)</span>
              <div className="text-[28px] font-semibold leading-[1.3]">The quick brown fox jumps over the lazy dog</div>
            </div>
            <div>
              <span className="text-sm text-[var(--color-muted-text)] block mb-1">Section Heading (20px, Semibold)</span>
              <div className="text-[20px] font-semibold leading-[1.4]">The quick brown fox jumps over the lazy dog</div>
            </div>
            <div>
              <span className="text-sm text-[var(--color-muted-text)] block mb-1">Body (16px, Regular)</span>
              <div className="text-[16px] font-normal leading-[1.5]">The quick brown fox jumps over the lazy dog</div>
            </div>
            <div>
              <span className="text-sm text-[var(--color-muted-text)] block mb-1">Small (14px, Regular)</span>
              <div className="text-[14px] font-normal leading-[1.5]">The quick brown fox jumps over the lazy dog</div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-[var(--color-border)] pb-2">2. Buttons</h2>
          <div className="flex flex-wrap gap-4 bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" loading>Loading</Button>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-[var(--color-border)] pb-2">3. Forms & Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)]">
            <Input 
              label="Standard Input" 
              placeholder="Enter something..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input 
              label="Error State Input" 
              placeholder="Invalid data..." 
              error="This field is required."
            />
            <Input 
              label="Disabled Input" 
              placeholder="Cannot type here" 
              disabled 
            />
            <Input 
              label="Password Input" 
              type="password"
              placeholder="••••••••" 
            />
          </div>
        </section>

        {/* Cards & Badges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-[var(--color-border)] pb-2">4. Cards & Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Mock Interview Session</h3>
                <Badge variant="completed">Completed</Badge>
              </div>
              <p className="text-sm text-[var(--color-secondary-text)] mb-4">
                Domain: Frontend Engineering<br/>
                Date: Oct 12, 2026
              </p>
              <div className="flex gap-2">
                <Badge variant="easy">Easy</Badge>
                <Badge variant="medium">Medium</Badge>
                <Badge variant="hard">Hard</Badge>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex justify-end">
                <Button variant="outline">View Report</Button>
              </div>
            </Card>

            <Card className="flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-bold text-[var(--color-primary)] mb-2">85/100</h3>
              <p className="text-sm text-[var(--color-secondary-text)]">Average Score</p>
            </Card>
          </div>
        </section>

        {/* Feedback States */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b border-[var(--color-border)] pb-2">5. Feedback States</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-2 text-[var(--color-muted-text)]">Loading Spinner</h3>
              <div className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)] flex justify-center gap-8">
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-[var(--color-muted-text)]">Empty State</h3>
              <EmptyState 
                title="No Interviews Yet"
                message="You haven't taken any mock interviews. Ready to start practicing?"
                action={<Button variant="primary">Start Interview</Button>}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-[var(--color-muted-text)]">Error State</h3>
              <ErrorState 
                title="Failed to Load Data"
                message="We encountered a problem while fetching your report."
                action={<Button variant="secondary">Try Again</Button>}
              />
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
};

export default DesignPreviewPage;
