import './Header.css';

/**
 * Header Component
 * 
 * Purpose: Navigation and user information display
 * - Shows app/company branding
 * - Displays current logged-in user
 * - Provides user menu with logout
 * - Appears on all admin pages
 * 
 * BEM Classes Used:
 * .header, .header__container, .header__brand, .header__user, .header__button
 */
function Header({ user, onLogout, sidebarOpen, onToggleSidebar }) {
  return (
    <header className="header">
      {/* Header Brand Box - Aligns with sidebar */}
      <div className={`headerBrand ${sidebarOpen ? 'headerBrandOpen' : 'headerBrandClosed'}`}>
        {/* Toggle Button */}
        <button 
          onClick={onToggleSidebar}
          className="headerToggle"
          title="Toggle sidebar"
        >
          ☰
        </button>
        <div className="headerBrandContent">
          <h2 className="headerTitle">Myotronics Admin</h2>
          <p className="headerSubtitle">Management System</p>
        </div>
      </div>

      {/* Header Container - Takes remaining space */}
      <div className={`headerContainer ${sidebarOpen ? 'headerContainerOpen' : 'headerContainerClosed'}`}>

        {/* User Info Section */}
        <div className="headerUser">
          {/* Notification Icon */}
          <div className="headerNotification">
            <span className="notificationIcon">🔔</span>
            <span className="notificationBadge">3</span>
          </div>

          {/* User Profile Display */}
          <div className="headerInfo">
            <span className="headerAvatar">👤</span>
            <div className="headerDetails">
              <p className="headerName">{user?.name || 'User'}</p>
              {/* <p className="headerEmail">{user?.email || 'No email'}</p> */}
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="headerButton"
            title="Click to logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
