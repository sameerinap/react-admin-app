import { useState } from 'react';
import './Sidebar.css';

/**
 * Sidebar Component
 * 
 * Purpose: Left-side navigation menu for the admin dashboard
 * - Displays vertically stacked menu items
 * - Provides navigation to different admin sections
 * - Professional sidebar navigation UI
 * - Supports collapse/expand toggle
 * - Toggle button at top
 */
function Sidebar({ isOpen = true, onToggleSidebar }) {
  // State for active menu item
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Menu items configuration
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'sidebarOpen' : 'sidebarCollapsed'}`}>
      <nav className="sidebarNav">
        <ul className="sidebarMenu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebarItem">
              <button
                className={`sidebarLink ${
                  activeMenu === item.id ? 'sidebarLinkActive' : ''
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <span className="sidebarIcon">{item.icon}</span>
                <span className="sidebarLabel">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebarFooter">
        <p className="sidebarVersion">v1.0.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
