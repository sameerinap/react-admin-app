import { useState } from 'react'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Breadcrumb from './components/Breadcrumb'
import UserManagement from './components/UserManagement'
import RoleManagement from './components/RoleManagement'
import PermissionManagement from './components/PermissionManagement'
import './App.css'

/**
 * App Component - Main Application Entry Point
 * 
 * Architecture:
 * - Manages authentication state (isLoggedIn)
 * - Stores user data globally
 * - Conditionally renders Login or Dashboard based on auth state
 * - Provides logout functionality
 * 
 * Why This Structure?
 * 1. Single Source of Truth: Auth state lives in App.jsx
 * 2. Data Flow: Props flow down to components (Header, Footer, Login)
 * 3. Event Handling: Callbacks flow up from child components (onLogin, onLogout)
 * 4. Separation of Concerns: Each component has a single responsibility
 */
function App() {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State to store logged-in user's information
  const [user, setUser] = useState(null);
  
  // State to track sidebar visibility (toggle)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // State to track current page and submenu
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSubmenu, setCurrentSubmenu] = useState('dashboard');

  // Mapping of submenu IDs to their display labels
  const submenuLabels = {
    'dashboard': 'Dashboard',
    'overview': 'Overview',
    'activity': 'Activity',
    'users': 'User List',
    'roles': 'Roles',
    'permissions': 'Permissions',
    'reports': 'Reports',
    'trends': 'Trends',
    'metrics': 'Metrics',
    'monthly': 'Monthly',
    'quarterly': 'Quarterly',
    'annual': 'Annual',
    'general': 'General',
    'security': 'Security',
    'notifications': 'Notifications',
    'system': 'System',
    'database': 'Database',
    'api': 'API',
    'guides': 'Guides',
    'faq': 'FAQ',
    'api-docs': 'API Docs',
  };

  /**
   * handleLogin - Called when user successfully logs in
   * Parameters: userData (email, name, etc.)
   * Purpose: Set authentication state and user data
   */
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  /**
   * handleLogout - Called when user clicks logout
   * Purpose: Clear authentication and redirect to login
   */
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      {/* CONDITIONAL RENDERING: Show login only if not logged in */}
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        // MAIN LAYOUT: Shows when user is logged in
        <div className={`mainLayout ${sidebarOpen ? 'mainLayoutOpen' : 'mainLayoutClosed'}`}>
          {/* Header - Fixed at top */}
          <Header user={user} onLogout={handleLogout} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Sidebar - Fixed on left */}
          <Sidebar isOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} currentPage={currentPage} currentSubmenu={currentSubmenu} onPageChange={setCurrentPage} onSubmenuChange={setCurrentSubmenu} />

          {/* Main Content Area */}
          <main className="mainContent">
            <div className="mainContainer">
              {/* Breadcrumb Navigation - Standard 3-level breadcrumb */}
              {currentPage === 'home' && (
                <Breadcrumb items={[
                  { label: 'Home', active: currentSubmenu === 'dashboard' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, page: 'home', submenu: currentSubmenu, active: currentSubmenu !== 'dashboard' }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}
              {currentPage === 'userManagement' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home', submenu: 'dashboard' },
                  { label: 'Users', page: 'userManagement', submenu: 'users' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, active: true }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}
              {currentPage === 'roles' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home', submenu: 'dashboard' },
                  { label: 'Users', page: 'userManagement', submenu: 'users' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, active: true }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}
              {currentPage === 'permissions' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home', submenu: 'dashboard' },
                  { label: 'Users', page: 'userManagement', submenu: 'users' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, active: true }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}
              {currentPage === 'analytics' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home', submenu: 'dashboard' },
                  { label: 'Analytics', page: 'analytics', submenu: 'reports' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, active: true }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}
              {currentPage === 'settings' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home', submenu: 'dashboard' },
                  { label: 'Settings', page: 'settings', submenu: 'general' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, active: true }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}
              {currentPage === 'reports' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home', submenu: 'dashboard' },
                  { label: 'Reports', page: 'reports', submenu: 'monthly' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, active: true }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}
              {currentPage === 'configuration' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home', submenu: 'dashboard' },
                  { label: 'Configuration', page: 'configuration', submenu: 'system' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, active: true }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}
              {currentPage === 'documentation' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home', submenu: 'dashboard' },
                  { label: 'Documentation', page: 'documentation', submenu: 'guides' },
                  { label: submenuLabels[currentSubmenu] || currentSubmenu, active: true }
                ]} onNavigate={(page, sub) => { setCurrentPage(page); if(sub) setCurrentSubmenu(sub); }} />
              )}

              {/* Conditionally render pages */}
              {currentPage === 'home' && (
                <section className="welcomeSection">
                  {/* Dashboard Stats Cards */}
                  <div className="statsGrid">
                    <div className="statsCard">
                      <div className="statsIcon">📊</div>
                      <h3>Dashboard</h3>
                      <p>View analytics and performance metrics</p>
                    </div>

                    <div className="statsCard">
                      <div className="statsIcon">👥</div>
                      <h3>Users</h3>
                      <p>Manage administrators and system </p>
                    </div>

                    <div className="statsCard">
                      <div className="statsIcon">⚙️</div>
                      <h3>System Settings</h3>
                      <p>Configure system parameters</p>
                    </div>

                    <div className="statsCard">
                      <div className="statsIcon">📈</div>
                      <h3>Reports</h3>
                      <p>Generate and view system reports</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="actionSection">
                    <h2 className="actionTitle">Quick Actions</h2>
                    <div className="actionButtons">
                      <button className="action__button">
                        ➕ Create New User
                      </button>
                      <button className="action__button">
                        📋 View Reports
                      </button>
                      <button className="action__button">
                        🔧 System Config
                      </button>
                      <button className="action__button">
                        📡 Check Status
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity Section */}
                  <div className="activitySection">
                    <h2 className="activityTitle">Recent Activity</h2>
                    <ul className="activityList">
                      <li>✓ User 'john.doe@company.com' was added on April 1, 2026</li>
                      <li>✓ System backup completed successfully</li>
                      <li>✓ Configuration update applied to all devices</li>
                      <li>✓ Monthly report generated successfully</li>
                    </ul>
                  </div>
                </section>
              )}

              {/* Users Page */}
              {currentPage === 'userManagement' && (
                <UserManagement />
              )}

              {/* Roles Page */}
              {currentPage === 'roles' && (
                <RoleManagement />
              )}

              {/* Permissions Page */}
              {currentPage === 'permissions' && (
                <PermissionManagement />
              )}
            </div>
          </main>

          {/* Footer - Fixed at bottom */}
          <Footer sidebarOpen={sidebarOpen} />
        </div>
      )}
    </div>
  );
}

export default App
