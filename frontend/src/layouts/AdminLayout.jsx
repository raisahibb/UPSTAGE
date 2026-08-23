// Ye layout Admin pages ke liye hai.
// Isme abhi ke liye basic navbar hai, later sidebar bhi add ho sakta hai.

import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {/* Navbar ko admin role pass karenge taaki specific links render ho saken baad mein */}
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Admin Sidebar placeholder (Sirf visual purpose ke liye abhi) */}
          <aside className="w-64 hidden md:block flex-shrink-0">
            <nav className="space-y-1">
              <Link to="/admin" className="bg-[var(--color-surface)] text-[var(--color-primary-text)] group flex items-center px-3 py-2 text-sm font-medium rounded-md border border-[var(--color-border)]">
                Dashboard
              </Link>
              <Link to="/admin" className="text-[var(--color-secondary-text)] hover:bg-[var(--color-surface)] group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                Users
              </Link>
              <Link to="/admin" className="text-[var(--color-secondary-text)] hover:bg-[var(--color-surface)] group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                Questions
              </Link>
            </nav>
          </aside>
          
          {/* Right side content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
