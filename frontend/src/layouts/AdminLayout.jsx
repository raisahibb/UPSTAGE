// Ye layout Admin pages ke liye hai.
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
    return isActive 
      ? "bg-[var(--color-surface)] text-[var(--color-primary-text)] group flex items-center px-3 py-2 text-sm font-medium rounded-md border border-[var(--color-border)]"
      : "text-[var(--color-secondary-text)] hover:bg-[var(--color-surface)] group flex items-center px-3 py-2 text-sm font-medium rounded-md";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {/* Navbar ko admin role pass karenge taaki specific links render ho saken baad mein */}
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Admin Nav */}
        <nav className="md:hidden flex overflow-x-auto space-x-2 pb-4 mb-4 border-b border-[var(--color-border)]">
          <Link to="/admin" className={getLinkClass('/admin').replace('flex', 'inline-flex flex-shrink-0')}>Dashboard</Link>
          <Link to="/admin/users" className={getLinkClass('/admin/users').replace('flex', 'inline-flex flex-shrink-0')}>Users</Link>
          <Link to="/admin/questions" className={getLinkClass('/admin/questions').replace('flex', 'inline-flex flex-shrink-0')}>Questions</Link>
          <Link to="/admin/question-bank" className={getLinkClass('/admin/question-bank').replace('flex', 'inline-flex flex-shrink-0 gap-1')}>
            Bank <span className="text-[10px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded font-bold">FB</span>
          </Link>
        </nav>

        <div className="flex gap-8">
          {/* Admin Sidebar */}
          <aside className="w-64 hidden md:block flex-shrink-0">
            <nav className="space-y-1">
              <Link to="/admin" className={getLinkClass('/admin')}>
                Dashboard
              </Link>
              <Link to="/admin/users" className={getLinkClass('/admin/users')}>
                Users
              </Link>
              <Link to="/admin/questions" className={getLinkClass('/admin/questions')}>
                Questions
              </Link>
              <Link to="/admin/question-bank" className={getLinkClass('/admin/question-bank')}>
                Question Bank
                <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-semibold">Fallback</span>
              </Link>
            </nav>
          </aside>
          
          {/* Right side content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
