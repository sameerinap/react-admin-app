import { useState } from 'react';
import './Sidebar.css';

function Sidebar({ isOpen = true, onToggleSidebar, currentPage = 'dashboard', onPageChange }) {
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
      hasSubmenu: true,
    },
    {
      id: 'userManagement',
      label: 'User Management',
      icon: '👥',
      hasSubmenu: true,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📊',
      hasSubmenu: true,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📄',
      hasSubmenu: true,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      hasSubmenu: true,
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: '🔧',
      hasSubmenu: true,
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: '📚',
      hasSubmenu: true,
    },
    {
      id: 'support',
      label: 'Support',
      icon: '🆘',
      hasSubmenu: true,
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
                <div
                  className={`sidebarSection ${
                    expandedSections[item.id] ? 'sidebarSectionExpanded' : ''
                  } ${currentPage === item.id ? 'sidebarSectionActive' : ''}`}
                  onClick={() => {
                    toggleSection(item.id);
                    onPageChange(item.id);
                  }}
                >
                  <span className="sidebarIcon">{item.icon}</span>
                  <span className="sidebarLabel">{item.label}</span>
                  {item.hasSubmenu && (
                    <span className={`sidebarChevron ${expandedSections[item.id] ? 'chevronOpen' : ''}`}>
                      ▼
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
