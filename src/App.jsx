import { useState } from 'react'
import Login from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Breadcrumb from './components/Breadcrumb'
import UserManagement from './components/UserManagement'
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

  // State to track current page
  const [currentPage, setCurrentPage] = useState('home');

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
          <Sidebar isOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} currentPage={currentPage} onPageChange={setCurrentPage} />

          {/* Main Content Area */}
          <main className="mainContent">
            <div className="mainContainer">
              {/* Breadcrumb Navigation - Only show on non-home pages */}
              {currentPage === 'userManagement' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home' },
                  { label: 'User Management', active: true }
                ]} onNavigate={setCurrentPage} />
              )}
              {currentPage === 'settings' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home' },
                  { label: 'Settings', active: true }
                ]} onNavigate={setCurrentPage} />
              )}
              {currentPage === 'reports' && (
                <Breadcrumb items={[
                  { label: 'Home', page: 'home' },
                  { label: 'Reports', active: true }
                ]} onNavigate={setCurrentPage} />
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
                      <h3>User Management</h3>
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

              {/* User Management Page */}
              {currentPage === 'userManagement' && (
                <UserManagement />
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
