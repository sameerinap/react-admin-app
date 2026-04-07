import { useState } from 'react';
import './Sidebar.css';
import angleRightIcon from '../assets/angle-right.svg';

function Sidebar({ isOpen = true, onToggleSidebar, currentPage = 'dashboard', currentSubmenu = '', onPageChange, onSubmenuChange }) {
  const [expandedSections, setExpandedSections] = useState({
    home: false,
    userManagement: false,
    analytics: false,
    reports: false,
    settings: false,
    configuration: false,
    documentation: false,
    support: false,
  });

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      page: 'home',
      submenu: [
        { id: 'dashboard', label: 'Dashboard', icon: '📈', page: 'home' },
        { id: 'overview', label: 'Overview', icon: '👁️', page: 'home' },
        { id: 'activity', label: 'Activity', icon: '📝', page: 'home' },
      ],
    },
    {
      id: 'userManagement',
      label: 'Users',
      icon: '👥',
      page: 'userManagement',
      submenu: [
        { id: 'users', label: 'User List', icon: '👤', page: 'userManagement' },
        { id: 'roles', label: 'Roles', icon: '🏷️', page: 'userManagement' },
        { id: 'permissions', label: 'Permissions', icon: '🔐', page: 'userManagement' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📊',
      page: 'analytics',
      submenu: [
        { id: 'reports', label: 'Reports', icon: '📄', page: 'analytics' },
        { id: 'trends', label: 'Trends', icon: '📈', page: 'analytics' },
        { id: 'metrics', label: 'Metrics', icon: '📐', page: 'analytics' },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📄',
      page: 'reports',
      submenu: [
        { id: 'monthly', label: 'Monthly', icon: '📋', page: 'reports' },
        { id: 'quarterly', label: 'Quarterly', icon: '📊', page: 'reports' },
        { id: 'annual', label: 'Annual', icon: '📅', page: 'reports' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      page: 'settings',
      submenu: [
        { id: 'general', label: 'General', icon: '⚙️', page: 'settings' },
        { id: 'security', label: 'Security', icon: '🔒', page: 'settings' },
        { id: 'notifications', label: 'Notifications', icon: '🔔', page: 'settings' },
      ],
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: '🔧',
      page: 'configuration',
      submenu: [
        { id: 'system', label: 'System', icon: '💻', page: 'configuration' },
        { id: 'database', label: 'Database', icon: '🗄️', page: 'configuration' },
        { id: 'api', label: 'API', icon: '🌐', page: 'configuration' },
      ],
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: '📚',
      page: 'documentation',
      submenu: [
        { id: 'guides', label: 'Guides', icon: '📖', page: 'documentation' },
        { id: 'faq', label: 'FAQ', icon: '❓', page: 'documentation' },
        { id: 'api-docs', label: 'API Docs', icon: '📎', page: 'documentation' },
      ],
    },
    {
      id: 'support',
      label: 'Support',
      icon: '🆘',
      page: 'support',
      submenu: [
        { id: 'help', label: 'Help', icon: '🤝', page: 'support' },
        { id: 'contact', label: 'Contact', icon: '📧', page: 'support' },
        { id: 'feedback', label: 'Feedback', icon: '💬', page: 'support' },
      ],
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <>
      {/* SIDEBAR - Only visible when open */}
      <aside className={`sidebar ${isOpen ? 'sidebarOpen' : 'sidebarClosed'}`}>
        <nav className="sidebarNav">
          <ul className="sidebarMenu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebarItem">
                {/* Main Menu Item */}
                <div
                  className={`sidebarLink ${
                    expandedSections[item.id] ? 'sidebarLinkExpanded' : ''
                  } ${currentPage === item.id ? 'sidebarLinkActive' : ''}`}
                  onClick={() => {
                    toggleSection(item.id);
                  }}
                  title={isOpen ? item.label : item.label}
                >
                  <span className="sidebarIcon">{item.icon}</span>
                  {isOpen && (
                    <>
                      {item.submenu && (
                        <img 
                          src={angleRightIcon} 
                          alt="toggle" 
                          className={`sidebarChevron ${expandedSections[item.id] ? 'chevronOpen' : ''}`}
                        />
                      )}
                      <span className="sidebarLinkLabel">{item.label}</span>
                    </>
                  )}
                </div>

                {/* Submenu Items - Only show when expanded and sidebar is open */}
                {isOpen && expandedSections[item.id] && item.submenu && (
                  <ul className="sidebarSubmenu">
                    {item.submenu.map((submenu) => (
                      <li key={submenu.id} className="sidebarSubmenuItem">
                        <div
                          className={`sidebarSubmenuLink ${
                            currentSubmenu === submenu.id ? 'sidebarSubmenuLinkActive' : ''
                          }`}
                          onClick={() => {
                            onPageChange(submenu.page);
                            onSubmenuChange(submenu.id);
                          }}
                          title={submenu.label}
                        >
                          <span className="sidebarSubmenuIcon">{submenu.icon}</span>
                          <span className="sidebarSubmenuLabel">{submenu.label}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
