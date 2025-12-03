import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout() {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/galleries/new', label: 'New Gallery', icon: '➕' },
  ];

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Top Bar */}
      <header className="bg-stone-900 text-white h-16 fixed top-0 left-0 right-0 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="flex items-center">
              <span className="text-2xl font-script">Heirloom</span>
              <span className="text-xs ml-2 text-stone-400">Admin</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    location.pathname === item.path
                      ? 'bg-stone-700 text-white'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="/" 
              target="_blank"
              className="text-stone-400 hover:text-white text-sm transition-colors"
            >
              View Site →
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm text-stone-300 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
