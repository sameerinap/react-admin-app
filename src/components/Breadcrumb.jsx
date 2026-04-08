import './Breadcrumb.css';

/**
 * Breadcrumb Component
 * 
 * Purpose: Display navigation path across all pages
 * - Reusable component for every page
 * - Shows current page location
 * - Clickable for navigation between pages
 * 
 * Props:q
 *   - items: Array of breadcrumb items [{ label: 'Home', page: 'home' }, { label: 'User Management', active: true }]
 *   - onNavigate: Callback function to handle page navigation
 */

function Breadcrumb({ items = [], onNavigate }) {

  const handleClick = (page, submenu, isActive) => {
    // Don't navigate if this is the active item
    if (isActive) return;
    
    if (onNavigate && page) {
      onNavigate(page, submenu);
    }
  };

  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="breadcrumbContainer">
          <span 
            className={`breadcrumbItem ${item.active ? 'active' : ''}`}
            onClick={() => handleClick(item.page, item.submenu, item.active)}
          >
            {item.label}
          </span>
          {index < items.length - 1 && (
            <span className="breadcrumbSeparator">›</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;
